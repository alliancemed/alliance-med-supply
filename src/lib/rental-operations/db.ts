import type {
  RentalAsset,
  RentalSnapshot,
} from '@/lib/rental-operations/types';
import postgres from 'postgres';

type AssetRow = {
  id: string;
  barcode: string;
  ain: string | null;
  product_name: string;
  category: string | null;
  status: RentalAsset['status'];
  customer: string | null;
  due_date: Date | null;
  invoice_number: string | null;
};

let client: ReturnType<typeof postgres> | undefined;

function database() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured.');
  }
  client ??= postgres(process.env.DATABASE_URL, { prepare: false, max: 5 });
  return client;
}

function mapAsset(row: AssetRow): RentalAsset {
  return {
    id: row.id,
    barcode: row.barcode,
    ain: row.ain ?? 'Unassigned AIN',
    product: row.product_name,
    category: row.category ?? 'Uncategorized',
    status: row.status,
    customer: row.customer ?? undefined,
    dueDate: row.due_date?.toISOString().slice(0, 10),
    invoiceNumber: row.invoice_number ?? undefined,
  };
}

export async function getRentalSnapshot(): Promise<RentalSnapshot> {
  const sql = database();
  const rows = await sql<AssetRow[]>`
    select
      a.id, a.barcode, a.ain, a.product_name, a.category,
      case
        when a.status = 'rented' and ra.due_at::date < current_date then 'overdue'
        when a.status = 'rented' and ra.due_at::date = current_date then 'due-today'
        else a.status::text
      end as status,
      c.display_name as customer,
      ra.due_at as due_date,
      ra.quickbooks_invoice_number as invoice_number
    from rental_assets a
    left join lateral (
      select * from rental_assignments
      where asset_id = a.id and checked_in_at is null
      order by checked_out_at desc limit 1
    ) ra on true
    left join quickbooks_customers c on c.quickbooks_customer_id = ra.quickbooks_customer_id
    order by a.category nulls last, a.product_name, a.ain nulls last
  `;
  return {
    source: 'quickbooks',
    syncedAt: new Date().toISOString(),
    assets: rows.map(mapAsset),
  };
}

type CheckoutInput = {
  barcode: string;
  quickBooksCustomerId: string;
  customerName: string;
  quickBooksInvoiceId: string;
  quickBooksInvoiceNumber: string;
  dueAt: string;
  actor: string;
};

export async function checkOutAsset(input: CheckoutInput) {
  const sql = database();
  return sql.begin(async (transaction) => {
    const assets = await transaction<
      { id: string; ain: string | null; status: string }[]
    >`
      select id, ain, status from rental_assets where barcode = ${input.barcode} for update
    `;
    const asset = assets[0];
    if (!asset) throw new Error('No rental asset matches that barcode.');
    if (asset.status !== 'available')
      throw new Error(
        `${asset.ain ?? input.barcode} is not available for checkout.`
      );

    await transaction`
      insert into quickbooks_customers (quickbooks_customer_id, display_name)
      values (${input.quickBooksCustomerId}, ${input.customerName})
      on conflict (quickbooks_customer_id) do update
      set display_name = excluded.display_name, updated_at = now()
    `;
    const assignmentId = crypto.randomUUID();
    await transaction`
      insert into rental_assignments (
        id, asset_id, quickbooks_customer_id, quickbooks_invoice_id,
        quickbooks_invoice_number, checked_out_at, due_at, checked_out_by
      ) values (
        ${assignmentId}, ${asset.id}, ${input.quickBooksCustomerId}, ${input.quickBooksInvoiceId},
        ${input.quickBooksInvoiceNumber}, now(), ${input.dueAt}, ${input.actor}
      )
    `;
    await transaction`update rental_assets set status = 'rented', updated_at = now() where id = ${asset.id}`;
    await transaction`
      insert into rental_asset_events (id, asset_id, assignment_id, event_type, actor, payload)
      values (${crypto.randomUUID()}, ${asset.id}, ${assignmentId}, 'checked_out', ${input.actor},
        ${JSON.stringify({ invoiceNumber: input.quickBooksInvoiceNumber, dueAt: input.dueAt })}::jsonb)
    `;
  });
}

export async function checkInAsset(barcode: string, actor: string) {
  const sql = database();
  return sql.begin(async (transaction) => {
    const assignments = await transaction<
      { asset_id: string; id: string; ain: string | null }[]
    >`
      select ra.asset_id, ra.id, a.ain
      from rental_assignments ra
      join rental_assets a on a.id = ra.asset_id
      where a.barcode = ${barcode} and ra.checked_in_at is null
      for update of a, ra
    `;
    const assignment = assignments[0];
    if (!assignment) throw new Error('No open rental matches that barcode.');
    await transaction`update rental_assignments set checked_in_at = now(), checked_in_by = ${actor} where id = ${assignment.id}`;
    await transaction`update rental_assets set status = 'cleaning', updated_at = now() where id = ${assignment.asset_id}`;
    await transaction`
      insert into rental_asset_events (id, asset_id, assignment_id, event_type, actor)
      values (${crypto.randomUUID()}, ${assignment.asset_id}, ${assignment.id}, 'checked_in', ${actor})
    `;
  });
}
