'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** The current site's header/footer. Design-concept routes (/concept-*) bring their own chrome. */
export function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const path = usePathname() ?? '';
  if (path.startsWith('/concept-')) return <>{children}</>;
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      {header}
      <main id="main" tabIndex={-1}>{children}</main>
      {footer}
    </>
  );
}
