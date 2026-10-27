import { Container } from '@/components/ui/Container';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { offices } from '@/content/site';
import './contact.css';

export function ContactCta({ heading = ['Turn your power struggle', 'into a power move'], as = 'h2' }: { heading?: readonly string[]; as?: 'h1' | 'h2' }) {
  return (
    <section className="cc" aria-labelledby="cc-h">
      <Container>
        <div className="cc__grid">
          <div>
            <p className="label eyebrow">Contact us</p>
            <RevealHeading id="cc-h" as={as} className="cc__h" lines={heading} />
            <ul className="cc__offices">
              {offices.map((o) => (
                <li key={o.name}>
                  <p className="label">{o.name}</p>
                  <address>{o.address}</address>
                  <p className="cc__links">
                    {o.phone && <a href={`tel:${o.phone.replace(/\s/g, '')}`}>{o.phone}</a>}
                    <a href={`mailto:${o.email}`}>{o.email}</a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
