import { TransmissionPage } from '@/components/sections/pages/TransmissionPage';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.ctu, '/power-transmission/inter-state-ctu/');
export default function Page() { return <TransmissionPage kind="Inter State (CTU)" />; }
