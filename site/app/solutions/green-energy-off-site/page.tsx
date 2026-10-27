import { SolutionDetail } from '@/components/sections/pages/SolutionDetail';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.openAccess, '/solutions/green-energy-off-site/');
export default function Page() { return <SolutionDetail id="oa" />; }
