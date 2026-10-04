export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="card sticky top-2 z-10 mb-9 flex h-12 items-center justify-between px-4">
      {children}
    </header>
  );
}
