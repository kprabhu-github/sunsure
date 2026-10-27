import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
export const metadata = { title: 'Page not found - Sunsure Energy' };
export default function NotFound() {
  return (<><PageHero eyebrow="404" lines={['This page is off the grid']} /><section className="pg"><Container><p className="pg__p">The page you are looking for does not exist or has moved.</p><div className="pg__cta"><Button href="/">Back to home</Button></div></Container></section></>);
}
