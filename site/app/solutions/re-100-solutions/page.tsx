import { SolutionDetail } from '@/components/sections/pages/SolutionDetail';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.rtc, '/solutions/re-100-solutions/');
export default function Page() { return <SolutionDetail id="rtc" />; }
