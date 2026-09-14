import { listQuickBooksInvoices, refreshQuickBooksSession } from '@/lib/delivery-routing/quickbooks';
import {
  decryptQuickBooksSession,
  QUICKBOOKS_SESSION_COOKIE,
  setQuickBooksSessionCookie,
} from '@/lib/delivery-routing/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = decryptQuickBooksSession(
    request.cookies.get(QUICKBOOKS_SESSION_COOKIE)?.value
  );
  if (!session) {
    return NextResponse.json(
      { error: 'Connect QuickBooks before loading invoices.' },
      { status: 401 }
    );
  }
  try {
    const refreshed = await refreshQuickBooksSession(session);
    const response = NextResponse.json({ invoices: await listQuickBooksInvoices(refreshed) });
    setQuickBooksSessionCookie(response, refreshed);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'QuickBooks invoices are unavailable.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
