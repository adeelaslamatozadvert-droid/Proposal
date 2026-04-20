import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME, isAuthenticated } from '@/lib/auth';

export default async function ProposalMakerLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies();
  const authCookie = cookiesStore.get(AUTH_COOKIE_NAME)?.value;

  if (!isAuthenticated(authCookie)) {
    redirect('/login');
  }

  return <>{children}</>;
}
