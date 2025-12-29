export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-fit sticky top-0 z-100"></div>
      {children}
    </div>
  );
}
