import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero/Hero';
import { About } from '@/components/sections/home/About';
import { Stats } from '@/components/sections/home/Stats';
import { Investors } from '@/components/sections/home/Investors';
import { EnergyNetwork } from '@/components/sections/home/EnergyNetwork';
import { SolutionsExplorer } from '@/components/sections/home/SolutionsExplorer';
import { ProjectsShowcase } from '@/components/sections/home/ProjectsShowcase';
import { Advantage } from '@/components/sections/home/Advantage';
import { Customers } from '@/components/sections/home/Customers';
import { KnowledgeHub } from '@/components/sections/home/KnowledgeHub';
import { ContactCta } from '@/components/sections/home/ContactCta';
import { meta, titles } from '@/lib/seo';

export const metadata: Metadata = meta(titles.home, '/');

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Investors />
      <EnergyNetwork />
      <SolutionsExplorer />
      <ProjectsShowcase />
      <Advantage />
      <Customers />
      <KnowledgeHub />
      <ContactCta />
    </>
  );
}
