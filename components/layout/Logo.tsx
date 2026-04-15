import clsx from 'clsx';

type Props = {
  className?: string;
  variant?: 'full' | 'mark';
};

export function Logo({ className, variant = 'full' }: Props) {
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={clsx('text-ink-900', className)}
        aria-hidden
      >
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path
          d="M10 20V12h8M10 16h6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 152 32"
      fill="none"
      className={clsx('text-ink-900', className)}
      aria-hidden
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M10 20V12h8M10 16h6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="42"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-display), system-ui"
        fontSize="16"
        fontWeight="600"
        letterSpacing="-0.01em"
      >
        Genie Factory
      </text>
    </svg>
  );
}
