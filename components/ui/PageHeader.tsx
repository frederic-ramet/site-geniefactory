import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: 'left' | 'center';
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = 'left',
}: Props) {
  return (
    <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50/40 to-white">
      <div className="container py-16 sm:py-20">
        <div
          className={clsx(
            'flex flex-col gap-4',
            align === 'center' && 'items-center text-center',
          )}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-lg leading-relaxed text-ink-600">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
