import { NextResponse } from 'next/server';
import { ADMIN_PASSWORD, ADMIN_USERNAME, AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const username = body?.username?.toString() ?? '';
  const password = body?.password?.toString() ?? '';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: AUTH_COOKIE_MAX_AGE,
    });
    return response;
  }

  return NextResponse.json(
    { success: false, error: 'Invalid admin credentials.' },
    { status: 401 }
  );
}
