import Image from 'next/image';
import clsx from 'clsx';

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <Image
      src="/images/logo-full.webp"
      alt="GenieFactory"
      width={180}
      height={40}
      className={clsx('h-8 w-auto', className)}
      priority
    />
  );
}
