-- The portal, not QuickBooks, owns the physical-equipment lifecycle.
-- QuickBooks IDs are stored as references so accounting stays in QuickBooks Online.

create type rental_asset_status as enum (
  'available', 'reserved', 'rented', 'cleaning', 'repair', 'retired', 'lost'
);

create type rental_event_type as enum (
  'imported', 'checked_out', 'checked_in', 'condition_updated', 'status_updated'
);

create table rental_assets (
  id uuid primary key,
  barcode text not null unique,
  ain text,
  serial_number text,
  product_name text not null,
  product_model text,
  category text,
  status rental_asset_status not null default 'available',
  quickbooks_item_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index rental_assets_ain_unique
  on rental_assets (ain)
  where ain is not null;

create table rental_assignments (
  id uuid primary key,
  asset_id uuid not null references rental_assets(id),
  quickbooks_customer_id text not null,
  quickbooks_invoice_id text not null,
  quickbooks_invoice_number text,
  checked_out_at timestamptz not null,
  due_at timestamptz,
  checked_out_by text not null,
  checked_in_at timestamptz,
  checked_in_by text,
  checkout_condition text,
  return_condition text,
  notes text,
  created_at timestamptz not null default now()
);

-- A small local cache of QuickBooks customer names keeps dashboard reads fast,
-- while the QuickBooks ID remains the integration key.
create table quickbooks_customers (
  quickbooks_customer_id text primary key,
  display_name text not null,
  updated_at timestamptz not null default now()
);

create unique index one_open_assignment_per_asset
  on rental_assignments (asset_id)
  where checked_in_at is null;

create table rental_asset_events (
  id uuid primary key,
  asset_id uuid not null references rental_assets(id),
  assignment_id uuid references rental_assignments(id),
  event_type rental_event_type not null,
  actor text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
