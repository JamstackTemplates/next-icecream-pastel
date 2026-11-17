import type { ReactNode } from 'react';

/** Heading block for inner pages: eyebrow, title and a short lede. */
export function PageHead({ eyebrow, title, children, id, before }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  before?: ReactNode;
}) {
  return (
    <header className="wrap pt-[clamp(2rem,5vw,3.5rem)] pb-[clamp(1.25rem,2.5vw,2rem)]">
      {before}
      <p className="eyebrow">{eyebrow}</p>
      <h1 id={id} className="mt-2.5 mb-4 max-w-[20ch] text-[clamp(2.2rem,5.5vw,3.85rem)] text-ink">{title}</h1>
      {children ? <div className="max-w-(--measure) text-[1.0625rem] text-muted">{children}</div> : null}
    </header>
  );
}
