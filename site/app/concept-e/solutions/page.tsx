import Link from 'next/link';
import { Ch, H, Cta, B } from '@/components/concepts/e/parts';
import { DayChart } from '@/components/concepts/e/client';
import { PgTheme, SolSwitch, Months, AdvGrid, Faq } from '@/components/concepts/e/pg';
import { solutionsIntro, advantage } from '@/content/solutions';
export const metadata = { title: 'Solutions | Concept E' };
export default function Page() {
  return (
    <>
      <PgTheme name="solutions" solid light />
      <section id="intro" className="ch pgs-hero" data-t={5.5} data-name="Dawn" data-label="Solutions" aria-label="Solutions">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href={`${B}/`}>Home</Link><span>Solutions</span></nav>
          <span className="eyebrow">{solutionsIntro.eyebrow}</span>
          <h1 className="pgs-h">{solutionsIntro.heading.map((l, i) => <span key={l} className="ln"><span style={{ ['--i' as string]: i }}>{l}</span></span>)}</h1>
          <p className="pgs-p">{solutionsIntro.body}</p>
          <SolSwitch />
        </div>
      </section>

      <Ch t={12} name="Noon" label="Delivery" id="delivery" className="pgs-adv">
        <div className="wrap pgs-ag">
          <div><span className="eyebrow">{advantage.eyebrow}</span><H lines={[...advantage.heading]} /></div>
          <Months />
        </div>
        <div className="wrap"><AdvGrid /></div>
      </Ch>

      <Ch t={16} name="Afternoon" label="One day" id="day" className="pgs-day">
        <div className="wrap two">
          <div><span className="eyebrow">How RTC works</span><H lines={['Storage fills', 'the gaps']} />
            <p className="copy rv" style={{ marginTop: 18 }}>Solar peaks at noon and wind runs through the night. Battery storage covers what is left, so every hour of the day is clean and dispatchable.</p></div>
          <DayChart />
        </div>
      </Ch>

      <Ch t={19} name="Dusk" label="Questions" id="faq" className="pgs-faq">
        <div className="wrap pgs-fg">
          <div><span className="eyebrow">RE100 questions</span><H lines={['Before you', 'sign anything']} />
            <p className="copy rv" style={{ marginTop: 18 }}>Short answers on RE100, what it means for an Indian company and how to begin.</p></div>
          <Faq />
        </div>
      </Ch>
      <Cta t={22} />
    </>
  );
}
