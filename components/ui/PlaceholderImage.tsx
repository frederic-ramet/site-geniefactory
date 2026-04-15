import clsx from 'clsx';

type Props = {
  label?: string;
  aspect?: 'video' | 'square' | 'portrait' | 'wide';
  tone?: 'brand' | 'ink' | 'accent';
  className?: string;
};

const aspectMap = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[16/7]',
} as const;

const toneMap = {
  brand: 'from-brand-100 via-brand-50 to-white text-brand-800',
  ink: 'from-ink-100 via-ink-50 to-white text-ink-800',
  accent: 'from-accent-400/30 via-white to-brand-100 text-accent-600',
} as const;

/**
 * Fallback visual used while real screenshots and photos from the Framer
 * export are pending. Renders a branded gradient with the given label so the
 * layout remains complete during development.
 */
export function PlaceholderImage({
  label,
  aspect = 'video',
  tone = 'brand',
  className,
}: Props) {
  return (
    <div
      role="img"
      aria-label={label ?? 'Illustration à venir'}
      className={clsx(
        'relative w-full overflow-hidden rounded-2xl bg-gradient-to-br ring-1 ring-inset ring-ink-100',
        aspectMap[aspect],
        toneMap[tone],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_55%)]" />
      <div className="absolute inset-0 bg-grid-soft bg-[size:22px_22px] opacity-40" />
      <div className="absolute inset-0 flex items-end justify-start p-4 text-xs font-medium tracking-wide">
        {label && <span className="rounded-full bg-white/80 px-3 py-1">{label}</span>}
      </div>
    </div>
  );
}
