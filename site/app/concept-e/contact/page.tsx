import { Ch, H } from '@/components/concepts/e/parts';
import { PgTheme, QuoteFlow } from '@/components/concepts/e/pg';
import { offices } from '@/content/site';
export const metadata = { title: 'Contact | Concept E' };
export default function Page() {
  return (
    <>
      <PgTheme name="contact" solid />
      <Ch t={19} name="Dusk" label="Contact" id="reach" className="pgx">
        <div className="pgx-bg"><img src="/images/battery-storage.jpg" alt="" /></div>
        <div className="wrap pgx-g">
          <div className="pgx-l">
            <span className="eyebrow">Contact Us</span>
            <H lines={['Reach out to', 'get a free quote']} big />
            <p className="sub rv">Tell us what you need and how big your load is. We will map the cleanest route to renewable power, from investment to commissioning and operations.</p>
            <ul className="pgx-o">{offices.map((o) => (
              <li key={o.name} className="rv"><h3>{o.name}</h3><address>{o.address}</address>
                <p>{o.phone && <>{o.phone} · </>}<a href={`mailto:${o.email}`}>{o.email}</a></p></li>))}</ul>
          </div>
          <QuoteFlow />
        </div>
      </Ch>
    </>
  );
}
