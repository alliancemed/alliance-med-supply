'use client';

import type {
  AssetStatus,
  RentalAsset,
  RentalSnapshot,
} from '@/lib/rental-operations/types';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Barcode,
  CalendarClock,
  CircleAlert,
  PackageCheck,
  Search,
  Truck,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = { initialSnapshot: RentalSnapshot };

const statusStyle: Record<AssetStatus, string> = {
  available: 'bg-emerald-50 text-emerald-800 ring-emerald-600/20',
  rented: 'bg-sky-50 text-sky-800 ring-sky-600/20',
  'due-today': 'bg-amber-50 text-amber-900 ring-amber-600/20',
  overdue: 'bg-rose-50 text-rose-800 ring-rose-600/20',
  cleaning: 'bg-violet-50 text-violet-800 ring-violet-600/20',
  repair: 'bg-stone-100 text-stone-800 ring-stone-500/20',
};

const label: Record<AssetStatus, string> = {
  available: 'Available',
  rented: 'Out on rental',
  'due-today': 'Due today',
  overdue: 'Overdue',
  cleaning: 'Cleaning',
  repair: 'Repair',
};

export function RentalOperationsDashboard({ initialSnapshot }: Props) {
  const [assets, setAssets] = useState(initialSnapshot.assets);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | AssetStatus>('all');
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return assets.filter((asset) => {
      const matchesFilter =
        activeFilter === 'all' || asset.status === activeFilter;
      const matchesQuery =
        !normalized ||
        [
          asset.barcode,
          asset.ain,
          asset.product,
          asset.customer,
          asset.invoiceNumber,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalized));
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, assets, query]);

  const counts = useMemo(
    () => ({
      out: assets.filter((asset) =>
        ['rented', 'due-today', 'overdue'].includes(asset.status)
      ).length,
      dueToday: assets.filter((asset) => asset.status === 'due-today').length,
      overdue: assets.filter((asset) => asset.status === 'overdue').length,
      available: assets.filter((asset) => asset.status === 'available').length,
    }),
    [assets]
  );

  async function scan(action: 'checkout' | 'checkin') {
    const barcode = window.prompt(
      action === 'checkout'
        ? 'Scan or enter the equipment barcode to check out.'
        : 'Scan or enter the equipment barcode to check in.'
    );
    if (!barcode) return;
    const found = assets.find(
      (asset) => asset.barcode.toLowerCase() === barcode.trim().toLowerCase()
    );
    if (!found) {
      setNotice(`No asset was found for barcode “${barcode}”.`);
      return;
    }
    if (action === 'checkout' && found.status !== 'available') {
      setNotice(
        `${found.ain} cannot be checked out while marked ${label[found.status].toLowerCase()}.`
      );
      return;
    }
    if (
      action === 'checkin' &&
      !['rented', 'due-today', 'overdue'].includes(found.status)
    ) {
      setNotice(`${found.ain} is not currently checked out.`);
      return;
    }
    if (initialSnapshot.source === 'quickbooks') {
      try {
        if (action === 'checkout') {
          const invoiceResponse = await fetch(
            '/api/rental-operations/quickbooks/invoices',
            { cache: 'no-store' }
          );
          const invoicePayload = (await invoiceResponse.json()) as {
            error?: string;
            invoices?: Array<{
              id: string;
              number: string;
              customerId: string;
              customerName: string;
              dueDate?: string;
            }>;
          };
          if (!invoiceResponse.ok || !invoicePayload.invoices)
            throw new Error(
              invoicePayload.error ?? 'QuickBooks invoices are unavailable.'
            );
          const number = window.prompt(
            'Enter the QuickBooks invoice number.',
            invoicePayload.invoices[0]?.number
          );
          const invoice = invoicePayload.invoices.find(
            (item) => item.number === number?.trim()
          );
          if (!invoice)
            throw new Error('Choose a valid QuickBooks invoice number.');
          const dueAt = window.prompt(
            'Return date (YYYY-MM-DD).',
            invoice.dueDate
          );
          if (!dueAt) return;
          const response = await fetch('/api/rental-operations/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              barcode,
              quickBooksCustomerId: invoice.customerId,
              customerName: invoice.customerName,
              quickBooksInvoiceId: invoice.id,
              quickBooksInvoiceNumber: invoice.number,
              dueAt,
              actor: 'Warehouse driver',
            }),
          });
          const payload = (await response.json()) as { error?: string };
          if (!response.ok)
            throw new Error(
              payload.error ?? 'Checkout could not be completed.'
            );
        } else {
          const response = await fetch('/api/rental-operations/checkin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ barcode, actor: 'Warehouse driver' }),
          });
          const payload = (await response.json()) as { error?: string };
          if (!response.ok)
            throw new Error(
              payload.error ?? 'Check-in could not be completed.'
            );
        }
        window.location.reload();
        return;
      } catch (error) {
        setNotice(
          error instanceof Error
            ? error.message
            : 'The scan could not be completed.'
        );
        return;
      }
    }
    setAssets((current) =>
      current.map((asset) =>
        asset.id === found.id
          ? {
              ...asset,
              status: action === 'checkout' ? 'rented' : 'cleaning',
              ...(action === 'checkin'
                ? {
                    customer: undefined,
                    dueDate: undefined,
                    invoiceNumber: undefined,
                  }
                : {}),
            }
          : asset
      )
    );
    setNotice(
      `${found.ain} marked ${action === 'checkout' ? 'checked out' : 'checked in for cleaning'} in preview mode.`
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#f6f8f7] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#176554] text-white">
              <Truck size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#176554]">
                Alliance Medical
              </p>
              <h1 className="text-lg font-semibold tracking-tight">
                Rental operations
              </h1>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm text-slate-600 sm:flex">
            <span className="size-2 rounded-full bg-amber-500" />
            Preview data until QuickBooks sync is connected
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
        <section
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          aria-label="Rental status summary"
        >
          <Stat
            icon={Truck}
            label="Currently out"
            value={counts.out}
            tone="sky"
          />
          <Stat
            icon={CalendarClock}
            label="Due today"
            value={counts.dueToday}
            tone="amber"
          />
          <Stat
            icon={CircleAlert}
            label="Overdue"
            value={counts.overdue}
            tone="rose"
          />
          <Stat
            icon={PackageCheck}
            label="Available now"
            value={counts.available}
            tone="emerald"
          />
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_35px_rgba(23,50,45,0.06)]">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold tracking-tight">
                  Equipment board
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Every physical item and its current rental state.
                </p>
              </div>
              <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-slate-500 focus-within:border-[#176554] focus-within:ring-2 focus-within:ring-[#176554]/15 lg:w-80">
                <Search size={17} aria-hidden="true" />
                <span className="sr-only">Search equipment</span>
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Barcode, AIN, customer, invoice"
                  value={query}
                />
              </label>
            </div>
            <div className="flex gap-2 overflow-x-auto border-b border-slate-200 px-5 py-3">
              {(
                ['all', 'rented', 'due-today', 'overdue', 'available'] as const
              ).map((filter) => (
                <button
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition active:scale-[0.98] ${activeFilter === filter ? 'bg-[#176554] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                >
                  {filter === 'all' ? 'All equipment' : label[filter]}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Asset</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Customer / invoice</th>
                    <th className="px-5 py-3">Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((asset) => (
                    <AssetRow asset={asset} key={asset.id} />
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        className="px-5 py-12 text-center text-slate-500"
                        colSpan={4}
                      >
                        No equipment matches this view.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-2xl bg-[#143c35] p-6 text-white shadow-[0_14px_35px_rgba(23,50,45,0.16)]">
            <Barcode size={26} strokeWidth={1.6} aria-hidden="true" />
            <h2 className="mt-8 text-xl font-semibold tracking-tight">
              Driver scan station
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-50/75">
              At the warehouse, scan the exact item after the QuickBooks invoice
              is ready.
            </p>
            <div className="mt-6 grid gap-3">
              <button
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#143c35] transition hover:bg-emerald-50 active:translate-y-px"
                onClick={() => scan('checkout')}
                type="button"
              >
                <ArrowUpFromLine size={18} /> Check out item
              </button>
              <button
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-4 text-sm font-semibold text-white transition hover:bg-white/10 active:translate-y-px"
                onClick={() => scan('checkin')}
                type="button"
              >
                <ArrowDownToLine size={18} /> Check in item
              </button>
            </div>
            <div className="mt-8 border-t border-white/15 pt-5 text-sm leading-6 text-emerald-50/70">
              <p className="font-medium text-white">
                Required at production launch
              </p>
              <p className="mt-1">
                The scanner will validate availability, attach the QuickBooks
                customer and invoice, and write an audit record.
              </p>
            </div>
          </aside>
        </section>
        {notice && (
          <p
            aria-live="polite"
            className="mt-5 rounded-lg border border-[#176554]/20 bg-[#e9f5f2] px-4 py-3 text-sm text-[#124a3e]"
          >
            {notice}
          </p>
        )}
      </div>
    </main>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Truck;
  label: string;
  value: number;
  tone: 'sky' | 'amber' | 'rose' | 'emerald';
}) {
  const tones = {
    sky: 'bg-sky-50 text-sky-800',
    amber: 'bg-amber-50 text-amber-800',
    rose: 'bg-rose-50 text-rose-800',
    emerald: 'bg-emerald-50 text-emerald-800',
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div
        className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}
      >
        <Icon size={20} strokeWidth={1.7} />
      </div>
      <p className="mt-6 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

function AssetRow({ asset }: { asset: RentalAsset }) {
  return (
    <tr className="hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <p className="font-medium text-slate-900">{asset.product}</p>
        <p className="mt-1 font-mono text-xs text-slate-500">
          {asset.ain} · {asset.barcode}
        </p>
      </td>
      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyle[asset.status]}`}
        >
          {label[asset.status]}
        </span>
      </td>
      <td className="px-5 py-4 text-slate-600">
        {asset.customer ? (
          <>
            <p>{asset.customer}</p>
            <p className="mt-1 text-xs text-slate-500">{asset.invoiceNumber}</p>
          </>
        ) : (
          '—'
        )}
      </td>
      <td className="px-5 py-4 text-slate-600">{asset.dueDate ?? '—'}</td>
    </tr>
  );
}
