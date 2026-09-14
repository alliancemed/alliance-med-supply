import { NextRequest, NextResponse } from 'next/server';

function unauthorized(message: string) {
  return new NextResponse(message, {
    status: 401,
    headers: {
      'Cache-Control': 'no-store',
      'WWW-Authenticate': 'Basic realm="Alliance Delivery Planner"',
    },
  });
}

export function middleware(request: NextRequest) {
  const isRentalOperations = request.nextUrl.pathname.startsWith(
    '/rental-operations'
  );
  const username = isRentalOperations
    ? process.env.RENTAL_APP_USERNAME ?? process.env.DELIVERY_APP_USERNAME
    : process.env.DELIVERY_APP_USERNAME;
  const password = isRentalOperations
    ? process.env.RENTAL_APP_PASSWORD ?? process.env.DELIVERY_APP_PASSWORD
    : process.env.DELIVERY_APP_PASSWORD;
  const appName = isRentalOperations ? 'Rental operations' : 'Delivery planner';
  if (!username || !password) {
    return new NextResponse(
      `${appName} access is not configured. Set its username and password environment variables.`,
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Basic ')) {
    return unauthorized(`Sign in to open ${appName.toLowerCase()}.`);
  }

  try {
    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(':');
    const suppliedUsername = decoded.slice(0, separator);
    const suppliedPassword = decoded.slice(separator + 1);
    if (suppliedUsername !== username || suppliedPassword !== password) {
      return unauthorized(`The ${appName.toLowerCase()} username or password is incorrect.`);
    }
  } catch {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/delivery-routing/:path*',
    '/api/delivery-routing/:path*',
    '/rental-operations/:path*',
    '/api/rental-operations/:path*',
  ],
};
