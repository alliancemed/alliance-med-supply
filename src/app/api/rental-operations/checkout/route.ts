import { checkOutAsset } from '@/lib/rental-operations/db';
import { NextRequest, NextResponse } from 'next/server';

function required(body: Record<string, unknown>, key: string) {
  const value = body[key];
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${key} is required.`);
  return value.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const dueAt = required(body, 'dueAt');
    if (Number.isNaN(Date.parse(dueAt))) throw new Error('dueAt must be a valid date.');
    await checkOutAsset({
      barcode: required(body, 'barcode'),
      quickBooksCustomerId: required(body, 'quickBooksCustomerId'),
      customerName: required(body, 'customerName'),
      quickBooksInvoiceId: required(body, 'quickBooksInvoiceId'),
      quickBooksInvoiceNumber: required(body, 'quickBooksInvoiceNumber'),
      dueAt,
      actor: required(body, 'actor'),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout could not be completed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
