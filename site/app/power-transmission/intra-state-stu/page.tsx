import { TransmissionPage } from '@/components/sections/pages/TransmissionPage';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.stu, '/power-transmission/intra-state-stu/');
export default function Page() { return <TransmissionPage kind="Intra State (STU)" />; }
