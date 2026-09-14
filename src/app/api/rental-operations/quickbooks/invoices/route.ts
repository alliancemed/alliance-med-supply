import {
  listQuickBooksInvoices,
  refreshRentalQuickBooksSession,
} from '@/lib/rental-operations/quickbooks';
import {
  decryptRentalQuickBooksSession,
  RENTAL_QUICKBOOKS_SESSION_COOKIE,
  setRentalQuickBooksSessionCookie,
} from '@/lib/rental-operations/quickbooks-session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = decryptRentalQuickBooksSession(
    request.cookies.get(RENTAL_QUICKBOOKS_SESSION_COOKIE)?.value
  );
  if (!session) {
    return NextResponse.json(
      { error: 'Connect QuickBooks before loading invoices.' },
      { status: 401 }
    );
  }
  try {
    const refreshed = await refreshRentalQuickBooksSession(session);
    const response = NextResponse.json({
      invoices: await listQuickBooksInvoices(refreshed),
    });
    setRentalQuickBooksSessionCookie(response, refreshed);
    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'QuickBooks invoices are unavailable.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
