import Link from 'next/link';
import type { ComponentProps } from 'react';

/** Internal link. Prefetch is off: most target routes are not built yet (would 404 in the background). */
export function AppLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}
