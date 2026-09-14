import { getRentalSnapshot } from '@/lib/rental-operations/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getRentalSnapshot(), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Rental data is unavailable.';
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
