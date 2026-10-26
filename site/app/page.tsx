import SiteHeader from '@/components/header/SiteHeader';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
      </main>
    </>
  );
}
