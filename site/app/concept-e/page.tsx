import Link from 'next/link';
import { Hero, Ch, H, Cta, B } from '@/components/concepts/e/parts';
const pages = [
  ['About', `${B}/about/`, 'Who we are, what we believe, who we power.'],
  ['Solutions', `${B}/solutions/`, 'RE RTC and Green Energy Open Access.'],
  ['Projects', `${B}/projects/`, 'Plants commissioned across India.'],
  ['Careers', `${B}/careers/`, 'Make your power move with Sunsure.'],
  ['Knowledge Hub', `${B}/knowledge-hub/`, 'Blogs, webinars, media and awards.'],
  ['Contact', `${B}/contact/`, 'Reach out to get a free quote.'],
];
export default function Page() {
  return (
    <>
      <Hero img="/images/hero-solar-sunrise.webp" pos="50% 62%" alt="Solar plant at sunrise" eyebrow="Concept E: One Day of Power" lines={['One day of power.', 'Every page.']} sub="The inner pages of the Concept E redesign. Each page is another hour of the same day." />
      <Ch t={9} name="Morning" label="Pages">
        <div className="wrap">
          <span className="eyebrow">The pages</span>
          <H lines={['Choose an hour of the day']} />
          <ul className="rise c3" style={{ marginTop: 40 }}>{pages.map(([t, h, d], i) => (
            <li key={t} className="rc" style={{ ['--i' as string]: i % 3 }}><header><span>0{i + 1}</span><h3>{t}</h3></header><p>{d}</p><p style={{ paddingTop: 0 }}><Link className="link" href={h}>Open</Link></p></li>
          ))}</ul>
        </div>
      </Ch>
      <Cta />
    </>
  );
}
