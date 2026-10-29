import type { ReactNode } from 'react';
import { EShell } from '@/components/concepts/e/EShell';
export const metadata = { title: 'Concept E: One Day of Power | Sunsure design preview', robots: { index: false, follow: false } };
export default function Layout({ children }: { children: ReactNode }) { return <EShell>{children}</EShell>; }
