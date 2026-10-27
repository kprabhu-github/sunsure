import { Rail } from '@/components/concepts/b/Chrome';
import { HeroB } from '@/components/concepts/b/HeroB';
import { HeaderB, AboutB, SystemB, SolutionsSec, ProjectsB, AdvantageB, CustomersB, KnowledgeB, ContactB, FooterB } from '@/components/concepts/b/Sections';
import { ConceptSwitch } from '@/components/concepts/shared/ConceptSwitch';
import '@/components/concepts/b/b.css';

export default function ConceptB() {
  return (
    <>
      <a className="skip-link" href="#cb-main">Skip to main content</a>
      <Rail />
      <div className="cb-shell">
        <HeaderB />
        <main id="cb-main" tabIndex={-1}>
          <HeroB /><AboutB /><SystemB /><SolutionsSec /><ProjectsB /><AdvantageB /><CustomersB /><KnowledgeB /><ContactB />
        </main>
        <FooterB />
      </div>
      <ConceptSwitch current="b" />
    </>
  );
}
