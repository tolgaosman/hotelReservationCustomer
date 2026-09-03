export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-var(--nav-h))] bg-canvas pattern-diamond px-4 py-16 sm:px-6 lg:py-24">
      <main className="mx-auto max-w-[840px] overflow-hidden rounded-[40px] bg-surface shadow-2xl shadow-brand/5 border border-line">
        <div className="px-8 py-16 sm:px-20 sm:py-24">
          <div className="mb-16 flex flex-col items-center text-center">
            <h1 className="font-serif text-3xl text-ink sm:text-[42px] leading-tight">{title}</h1>
            <div className="mt-10 flex items-center justify-center gap-6 opacity-60">
              <div className="h-[1px] w-16 bg-brand"></div>
              <div className="h-2 w-2 rotate-45 bg-brand"></div>
              <div className="h-[1px] w-16 bg-brand"></div>
            </div>
          </div>
          
          <div className="space-y-8 text-[15px] leading-[1.8] text-ink/80 text-justify sm:text-left">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
