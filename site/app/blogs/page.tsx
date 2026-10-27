import { ListingPage } from '@/components/sections/pages/ListingPage';
import { blogs } from '@/content/knowledge';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.blogs, '/blogs/');
export default function Page() { return <ListingPage eyebrow="Knowledge Hub" title="Blogs" entries={blogs} note="Articles open on sunsure-energy.com." />; }
