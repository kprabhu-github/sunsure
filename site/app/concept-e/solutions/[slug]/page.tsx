import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Ch, H, Rise, Cta, B } from '@/components/concepts/e/parts';
import { PgTheme, PgHead } from '@/components/concepts/e/pg';
import { Panels, DayChart, GridPath, NightBand } from '@/components/concepts/e/client';
import { solutions, rtcFaqs } from '@/content/solutions';
export function generateStaticParams() { return solutions.map((s) => ({ slug: s.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const s = solutions.find((x) => x.slug === slug); if (!s) notFound();
  const other = solutions.find((x) => x.slug !== slug)!; const rtc = s.id === 'rtc';
  return (
    <>
      <PgTheme name="soldetail" solid light />
      <PgHead tone="light" img={rtc ? '/images/wind-turbines.jpg' : '/images/transmission.jpg'} eyebrow={s.name} lines={s.headline.split(', ').length > 1 ? s.headline.split(', ') : [s.headline]} sub={s.tagline}
        crumbs={[{ label: 'Solutions', href: `${B}/solutions/` }, { label: s.name }]}><p style={{ marginTop: 26 }}><Link className="btn" href={`${B}/contact/`}>Contact Us</Link></p></PgHead>
      <Ch t={9} name="Morning" label="Why">
        <div className="wrap">
          <span className="eyebrow">Why it matters</span><H lines={['The benefits go beyond', 'the environment']} />
          <div className="two" style={{ marginTop: 40, alignItems: 'start' }}>
            <div>{s.intro.map((p, i) => <p key={i} className="copy rv">{p}</p>)}</div>
            <Rise cols={2} items={(s.benefits ?? []).map((b) => ({ title: b.title, body: b.body }))} />
          </div>
        </div>
      </Ch>
      <Ch t={12} name="Noon" label="Offer" id="offer">
        <div className="wrap">
          <span className="eyebrow">What we offer</span><H lines={[s.name]} />
          <div style={{ marginTop: 36 }}><Panels items={s.items} /></div>
        </div>
      </Ch>
      <Ch t={15.5} name="Afternoon" label={rtc ? 'One day' : 'Off-site'}>
        <div className="wrap two">
          <div><span className="eyebrow">{rtc ? 'How RTC works' : 'How off-site works'}</span>
            <H lines={rtc ? ['Every hour of', 'the day, covered'] : ['Off-site energy,', 'on-site impact']} />
            <p className="copy rv" style={{ marginTop: 18 }}>{rtc ? 'Solar, wind and battery storage are combined and traded so your supply is firm and dispatchable, hour after hour.' : 'We connect you to solar and wind farms elsewhere on the grid, so you do not need space or capex on your own property.'}</p></div>
          {rtc ? <DayChart /> : <GridPath />}
        </div>
      </Ch>
      {rtc && (
        <>
          <NightBand lines={['Power that', 'does not sleep']} sub="Round-the-clock renewable energy for industry." />
          <Ch t={21.5} name="Night" label="FAQ" id="faq">
            <div className="wrap"><span className="eyebrow">FAQ</span><H lines={['Questions on RE100']} />
              <div className="faq rv">{rtcFaqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div></div>
          </Ch>
        </>
      )}
      <Cta t={rtc ? 25 : 21.5} />
      <div className="wrap nextp" style={{ paddingBottom: 60, position: 'relative' }}><Link className="link" href={`${B}/solutions/`}>All solutions</Link><Link className="link" href={`${B}/solutions/${other.slug}/`}>Next: {other.name}</Link></div>
    </>
  );
}
