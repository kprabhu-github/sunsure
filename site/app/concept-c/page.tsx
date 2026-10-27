import { NavC } from '@/components/concepts/c/NavC';
import { HeroC } from '@/components/concepts/c/HeroC';
import { AboutC, SolutionsC, AdvantageC, CustomersC, KnowledgeC, ContactC, FooterC } from '@/components/concepts/c/Sections';
import { PlantCards } from '@/components/concepts/c/PlantCards';
import { ConceptSwitch } from '@/components/concepts/shared/ConceptSwitch';
import '@/components/concepts/c/c.css';

export default function ConceptC() {
  return (
    <>
      <a className="skip-link" href="#cc2-main">Skip to main content</a>
      <NavC />
      <main id="cc2-main" tabIndex={-1}>
        <HeroC />
        <AboutC />
        <SolutionsC />
        <section className="cc2-pr" aria-labelledby="cc2-pr-h">
          <div className="cc2-wrap"><h2 id="cc2-pr-h" className="cc2-big">Our plants in India</h2><PlantCards /></div>
        </section>
        <AdvantageC /><CustomersC /><KnowledgeC /><ContactC />
      </main>
      <FooterC />
      <ConceptSwitch current="c" />
    </>
  );
}
