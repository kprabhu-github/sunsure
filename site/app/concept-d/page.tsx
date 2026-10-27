import { NavD } from '@/components/concepts/d/NavD';
import { HeroD } from '@/components/concepts/d/HeroD';
import { Assured } from '@/components/concepts/d/Assured';
import { SystemB } from '@/components/concepts/b/Sections';
import { ProjectsD, FooterD, AdvantageStackD, CustomersD, AboutD, SolutionsD } from '@/components/concepts/d/Sections';
import { KnowledgeD } from '@/components/concepts/d/KnowledgeD';
import { ContactD } from '@/components/concepts/d/ContactD';
import { ConceptSwitch } from '@/components/concepts/shared/ConceptSwitch';
import '@/components/concepts/b/b.css';
import '@/components/concepts/d/d.css';

export default function ConceptD() {
  return (
    <>
      <a className="skip-link" href="#cd-main">Skip to main content</a>
      <NavD />
      <main id="cd-main" tabIndex={-1}>
        <HeroD /><AboutD /><ProjectsD /><SystemB /><SolutionsD /><Assured><AdvantageStackD /></Assured><CustomersD /><KnowledgeD /><ContactD />
      </main>
      <FooterD />
      <ConceptSwitch current="d" />
    </>
  );
}
