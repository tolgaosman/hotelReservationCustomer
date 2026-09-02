export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-[800px] px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
      <div className="mt-10 space-y-5 text-sm leading-relaxed text-ink/80">
        {children}
      </div>
    </main>
  );
}
