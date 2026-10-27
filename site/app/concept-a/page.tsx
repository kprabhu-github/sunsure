import { HeroA } from '@/components/concepts/a/HeroA';
import { HeaderA, AboutA, SolutionsA, ProjectsA, AdvantageA, CustomersA, KnowledgeA, ContactA, FooterA } from '@/components/concepts/a/Sections';
import { ConceptSwitch } from '@/components/concepts/shared/ConceptSwitch';
import '@/components/concepts/a/a.css';

export default function ConceptA() {
  return (
    <>
      <a className="skip-link" href="#ca-main">Skip to main content</a>
      <HeaderA />
      <main id="ca-main" tabIndex={-1}>
        <HeroA /><AboutA /><SolutionsA /><ProjectsA /><AdvantageA /><CustomersA /><KnowledgeA /><ContactA />
      </main>
      <FooterA />
      <ConceptSwitch current="a" />
    </>
  );
}
