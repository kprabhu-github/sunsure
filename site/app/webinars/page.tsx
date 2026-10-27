import { ListingPage } from '@/components/sections/pages/ListingPage';
import { webinars } from '@/content/knowledge';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.webinars, '/webinars/');
export default function Page() { return <ListingPage eyebrow="Knowledge Hub" title="Webinars" entries={webinars} note="Webinars open on sunsure-energy.com." />; }
