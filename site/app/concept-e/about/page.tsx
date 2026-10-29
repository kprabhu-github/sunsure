import Link from 'next/link';
import { Ch, H, Cta, B } from '@/components/concepts/e/parts';
import { PgTheme, SMark, Count, ValuesList, LogoWall } from '@/components/concepts/e/pg';
import { about } from '@/content/about';
import { homeStats, investorStats } from '@/content/stats';
export const metadata = { title: 'About | Concept E' };
export default function Page() {
  return (
    <>
      <PgTheme name="about" solid />
      <section id="intro" className="ch pga-hero" data-t={5.5} data-name="Dawn" data-label="About" aria-label="About Sunsure">
        <div className="wrap pga-g">
          <div className="pga-c">
            <nav className="crumbs" aria-label="Breadcrumb"><Link href={`${B}/`}>Home</Link><span>About</span></nav>
            <span className="eyebrow">{about.homeEyebrow}</span>
            <h1 className="pga-h"><span className="ln"><span style={{ ['--i' as string]: 0 }}>Powering India’s</span></span><span className="ln"><span style={{ ['--i' as string]: 1 }}>energy</span></span><span className="ln"><span style={{ ['--i' as string]: 2 }}>independence</span></span></h1>
            <p className="pga-p">{about.paragraphs[0]}</p>
            <div className="pga-a"><Link className="btn" href={`${B}/solutions/`}>Our solutions</Link><Link className="link" href={`${B}/knowledge-hub/#media`}>Media &amp; awards</Link></div>
          </div>
          <div className="pga-m">
            <SMark />
            <ul className="pga-n">{homeStats.map((s) => <li key={s.label}><Count to={s.value} suffix={s.suffix} /><span>{s.label}</span></li>)}</ul>
          </div>
        </div>
        <div className="wrap"><div className="pga-back rv"><b>We are backed by</b><span className="pg"><i />Partners Group</span><span>$400 million equity commitment</span></div></div>
      </section>

      <Ch t={9} name="Morning" label="Story" id="story" className="pga-story">
        <div className="wrap pga-sg">
          <div className="pga-sl">
            <span className="eyebrow">What we do</span>
            <H lines={['Round the clock', 'renewable energy,', 'built to last']} />
          </div>
          <div className="pga-sr">
            <p className="copy rv">{about.paragraphs[1]}</p>
            <p className="copy rv">{about.paragraphs[2]}</p>
          </div>
          <div className="pga-ph a rv"><img src="/images/engineers.jpg" alt="Two Sunsure engineers reviewing a solar plant on a tablet" loading="lazy" /></div>
          <div className="pga-ph b rv"><img src="/images/wind-turbines.jpg" alt="Wind turbines on a hill at sunset" loading="lazy" /></div>
        </div>
      </Ch>

      <Ch t={12} name="Noon" label="Values" id="values" className="pga-values">
        <div className="wrap">
          <span className="eyebrow">What we believe</span>
          <H lines={['Four beliefs that run', 'every project']} />
          <ValuesList items={about.values.map((v) => ({ title: v.title, body: v.body }))} />
        </div>
      </Ch>

      <Ch t={15.5} name="Afternoon" label="Backing" id="backing" className="pga-inv">
        <div className="pga-bg"><img src="/images/banner2-scaled-1sdfsdf.webp" alt="" loading="lazy" /></div>
        <div className="wrap">
          <span className="eyebrow">Our investor</span>
          <H lines={['Backed by Partners Group,', 'a global private markets firm']} />
          <ul className="pga-is">{investorStats.map((s) => <li key={s.label} className="rv"><Count to={s.value} suffix={s.suffix.trim() ? ' ' + s.suffix.trim() : ''} /><span>{s.label}</span></li>)}</ul>
        </div>
      </Ch>

      <Ch t={21.5} name="Night" label="Customers" id="customers" className="pga-cust">
        <div className="wrap">
          <span className="eyebrow">Our customers</span>
          <H lines={['Trusted by India’s', 'leading businesses']} />
        </div>
        <LogoWall />
      </Ch>
      <Cta t={25} />
    </>
  );
}
