'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  as?: 'section' | 'div';
  bleed?: boolean;
  align?: 'left' | 'center';
};

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  as: Tag = 'section',
  bleed = false,
  align = 'left',
  ...rest
}: Props) {
  return (
    <Tag
      className={clsx('relative py-20 sm:py-24 md:py-28', className)}
      {...rest}
    >
      <div className={clsx(bleed ? '' : 'container')}>
        {(eyebrow || title || subtitle) && (
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              'mb-10 flex flex-col gap-4 md:mb-14',
              align === 'center' && 'items-center text-center',
              bleed && 'container',
            )}
          >
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2 className="section-title text-balance">{title}</h2>}
            {subtitle && <p className="section-subtitle text-balance">{subtitle}</p>}
          </motion.header>
        )}
        {children}
      </div>
    </Tag>
  );
}
