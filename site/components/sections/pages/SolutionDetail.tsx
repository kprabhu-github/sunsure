import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/sections/pages/CtaBand';
import { ContactForm } from '@/components/forms/ContactForm';
import { solutions, advantage, rtcFaqs } from '@/content/solutions';

/** Data-driven solution page for /solutions/<slug>/. */
export function SolutionDetail({ id }: { id: 'rtc' | 'oa' }) {
  const s = solutions.find((x) => x.id === id)!;
  return (
    <>
      <PageHero eyebrow={s.name} lines={[s.headline]} lead={s.tagline} crumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions/' }, { label: s.name }]} />
      <section className="pg">
        <Container>
          <div className="pg__grid pg__grid--split">
            <div>
              <p className="pg__p pg__p--body">{s.intro[0]}</p>
              {s.intro[1] && <p className="pg__p pg__p--body">{s.intro[1]}</p>}
            </div>
            {s.benefits && (
              <ul className={`pg__cols pg__cols--2`} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {s.benefits.map((b) => <li key={b.title} className="pg__card"><h3>{b.title}</h3><p>{b.body}</p></li>)}
              </ul>
            )}
          </div>
        </Container>
      </section>
      <section className="pg pg--alt" aria-label={`${s.name} offerings`}>
        <Container>
          <ol className="vals">
            {s.items.map((it, i) => (
              <li key={it.id} id={it.id}>
                <div><span className="pg__num">0{i + 1}</span><h3>{it.label}</h3></div>
                <div>
                  <p>{it.body}</p>
                  {it.facts && <dl className="pg__facts">{it.facts.map((f) => <div key={f.k}><dt className="label">{f.k}</dt><dd>{f.v}</dd></div>)}</dl>}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      {id === 'rtc' && (
        <section className="pg" aria-labelledby="faq-h">
          <Container>
            <h2 id="faq-h" className="pg__h2">Frequently asked questions</h2>
            <div className="faq">
              {rtcFaqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </Container>
        </section>
      )}
      <section className="pg pg--alt" aria-labelledby="adv-h">
        <Container>
          <p className="label eyebrow">{advantage.eyebrow}</p>
          <h2 id="adv-h" className="pg__h2">{advantage.heading.join(' ')}</h2>
          <div className="pg__cols pg__cols--3">
            {advantage.items.map((a) => <div key={a.title} className="pg__card"><h3>{a.title}</h3><p>{a.body}</p></div>)}
          </div>
        </Container>
      </section>
      <section className="pg"><Container><ContactForm /></Container></section>
    </>
  );
}
