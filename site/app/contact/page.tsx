import { ContactCta } from '@/components/sections/home/ContactCta';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.contact, '/contact/');
export default function Page() { return <div style={{ paddingTop: 'var(--header-h)' }}><ContactCta as="h1" heading={['Reach out to', 'get a free quote']} /></div>; }
