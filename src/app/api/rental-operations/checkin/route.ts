import { checkInAsset } from '@/lib/rental-operations/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const barcode = typeof body.barcode === 'string' ? body.barcode.trim() : '';
    const actor = typeof body.actor === 'string' ? body.actor.trim() : '';
    if (!barcode || !actor) throw new Error('barcode and actor are required.');
    await checkInAsset(barcode, actor);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Check-in could not be completed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
