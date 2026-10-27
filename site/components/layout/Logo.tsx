import { AppLink } from '@/components/ui/AppLink';

/** PLACEHOLDER mark — swap for the official Sunsure logo asset when supplied (see docs/asset-register.md). */
export function Logo() {
  return (
    <AppLink href="/" className="logo" aria-label="Sunsure Energy — home">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
        <path d="M22 9.5c-1.7-2-4-3-6.6-3-3.4 0-6 1.8-6 4.4 0 6.6 14.4 3.2 14.4 10.6 0 3-2.8 5-6.6 5-3 0-5.7-1.2-7.6-3.4" fill="none" stroke="var(--red)" strokeWidth="3.2" strokeLinecap="square" />
      </svg>
      <span className="logo__word">sunsure</span>
    </AppLink>
  );
}
