import crypto from 'node:crypto';

import type { NextResponse } from 'next/server';

export const RENTAL_QUICKBOOKS_SESSION_COOKIE = 'rental_qbo_session';

export type RentalQuickBooksSession = {
  realmId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt?: number;
};

function sessionKey() {
  const secret =
    process.env.RENTAL_SESSION_SECRET ?? process.env.DELIVERY_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('RENTAL_SESSION_SECRET must be at least 32 characters.');
  }
  return crypto.createHash('sha256').update(secret).digest();
}

export function decryptRentalQuickBooksSession(value?: string | null) {
  if (!value) return null;
  try {
    const data = Buffer.from(value, 'base64url');
    const iv = data.subarray(0, 12);
    const tag = data.subarray(12, 28);
    const encrypted = data.subarray(28);
    const decipher = crypto.createDecipheriv('aes-256-gcm', sessionKey(), iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]).toString('utf8');
    return JSON.parse(decrypted) as RentalQuickBooksSession;
  } catch {
    return null;
  }
}

export function setRentalQuickBooksSessionCookie(
  response: NextResponse,
  session: RentalQuickBooksSession
) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', sessionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(session), 'utf8'),
    cipher.final(),
  ]);
  const value = Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString(
    'base64url'
  );
  response.cookies.set(RENTAL_QUICKBOOKS_SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 90,
  });
}
