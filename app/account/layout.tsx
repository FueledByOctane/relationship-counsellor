// Force dynamic rendering for the account page
export const dynamic = 'force-dynamic';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
