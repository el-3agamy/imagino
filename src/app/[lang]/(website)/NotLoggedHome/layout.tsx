export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>layout</h1>
      <div>{children}</div>
    </>
  );
}
