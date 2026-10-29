import Link from 'next/link';
import { Ch, H, Cta, B } from '@/components/concepts/e/parts';
import { PgTheme, HubBrowser } from '@/components/concepts/e/pg';
import { blogs, webinars, media } from '@/content/knowledge';
export const metadata = { title: 'Knowledge Hub | Concept E' };
const all = [...blogs, ...webinars, ...media];
export default function Page() {
  return (
    <>
      <PgTheme name="hub" solid light />
      <section id="intro" className="ch pgk-hero" data-t={5.5} data-name="Dawn" data-label="Knowledge Hub" aria-label="Knowledge Hub">
        <div className="wrap pgk-g">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href={`${B}/`}>Home</Link><span>Knowledge Hub</span></nav>
            <span className="eyebrow">Knowledge Hub</span>
            <h1 className="pgk-h"><span className="ln"><span style={{ ['--i' as string]: 0 }}>Insights on</span></span><span className="ln"><span style={{ ['--i' as string]: 1 }}>India’s clean power</span></span></h1>
          </div>
          <div className="pgk-s"><p>Blogs, webinars, press and awards from the Sunsure team. Articles open on sunsure-energy.com.</p>
            <dl><div><dt>{blogs.length}</dt><dd>blogs</dd></div><div><dt>{webinars.length}</dt><dd>webinars</dd></div><div><dt>{media.length}</dt><dd>media and awards</dd></div></dl></div>
        </div>
      </section>
      <Ch t={9} name="Morning" label="Browse" id="browse" className="pgk-browse">
        <div className="wrap"><HubBrowser posts={all} /></div>
      </Ch>
      <Cta t={19} />
    </>
  );
}
