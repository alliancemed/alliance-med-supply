import type { RentalQuickBooksSession } from '@/lib/rental-operations/quickbooks-session';

type Invoice = {
  Id?: string;
  DocNumber?: string;
  Balance?: number;
  DueDate?: string;
  CustomerRef?: { value?: string; name?: string };
};

type QueryResponse = { QueryResponse?: { Invoice?: Invoice[] } };

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  x_refresh_token_expires_in?: number;
};

export type QuickBooksRentalInvoice = {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  dueDate?: string;
  balance: number;
};

const TOKEN_ENDPOINT =
  'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';

function apiBase() {
  return process.env.INTUIT_ENVIRONMENT === 'sandbox'
    ? 'https://sandbox-quickbooks.api.intuit.com'
    : 'https://quickbooks.api.intuit.com';
}

async function refreshToken(session: RentalQuickBooksSession) {
  const clientId = process.env.INTUIT_CLIENT_ID;
  const clientSecret = process.env.INTUIT_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('QuickBooks OAuth credentials are not configured.');
  }
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: session.refreshToken,
    }),
    cache: 'no-store',
  });
  if (!response.ok)
    throw new Error('QuickBooks authorization could not be refreshed.');
  const token = (await response.json()) as TokenResponse;
  const now = Date.now();
  return {
    ...session,
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    accessTokenExpiresAt: now + token.expires_in * 1000,
    refreshTokenExpiresAt: token.x_refresh_token_expires_in
      ? now + token.x_refresh_token_expires_in * 1000
      : session.refreshTokenExpiresAt,
  };
}

export async function refreshRentalQuickBooksSession(
  session: RentalQuickBooksSession
) {
  return session.accessTokenExpiresAt > Date.now() + 60_000
    ? session
    : refreshToken(session);
}

export async function listQuickBooksInvoices(
  session: RentalQuickBooksSession
): Promise<QuickBooksRentalInvoice[]> {
  const url = new URL(
    `${apiBase()}/v3/company/${encodeURIComponent(session.realmId)}/query`
  );
  url.searchParams.set(
    'query',
    'select * from Invoice startposition 1 maxresults 50'
  );
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`QuickBooks returned ${response.status}.`);
  const data = (await response.json()) as QueryResponse;
  return (data.QueryResponse?.Invoice ?? [])
    .filter(
      (
        invoice
      ): invoice is Invoice & {
        Id: string;
        CustomerRef: { value: string; name: string };
      } =>
        Boolean(
          invoice.Id && invoice.CustomerRef?.value && invoice.CustomerRef?.name
        )
    )
    .map((invoice) => ({
      id: invoice.Id,
      number: invoice.DocNumber ?? invoice.Id,
      customerId: invoice.CustomerRef.value,
      customerName: invoice.CustomerRef.name,
      dueDate: invoice.DueDate,
      balance: invoice.Balance ?? 0,
    }));
}
