import { ListingPage } from '@/components/sections/pages/ListingPage';
import { media } from '@/content/knowledge';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.media, '/media/');
export default function Page() { return <ListingPage eyebrow="Media & Awards" title="Media" entries={media} note="Coverage opens on sunsure-energy.com." />; }
