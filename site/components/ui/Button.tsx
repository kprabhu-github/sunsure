import type { ReactNode } from 'react';
import { AppLink } from './AppLink';

type Props = { href: string; children: ReactNode; variant?: 'primary' | 'secondary'; size?: 'md' | 'sm'; arrow?: boolean; className?: string; 'data-cta'?: string };

export function Button({ href, children, variant = 'primary', size = 'md', arrow = true, className = '', ...rest }: Props) {
  return (
    <AppLink href={href} className={`btn btn--${variant} ${size === 'sm' ? 'btn--sm' : ''} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && (
        <svg className="btn__arrow" viewBox="0 0 20 14" fill="none" aria-hidden="true">
          <path d="M0 7h18M12 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </AppLink>
  );
}
