'use client';
import { useState } from 'react';
import { AppLink } from '@/components/ui/AppLink';
import { Container } from '@/components/ui/Container';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { TabList } from '@/components/ui/TabList';
import { ContentGrid } from '@/components/content/ContentGrid';
import { blogs, webinars, media } from '@/content/knowledge';
import './knowledge.css';

const tabs = [
  { id: 'blogs', label: 'Blogs', entries: blogs, href: '/blogs/' },
  { id: 'webinars', label: 'Webinars', entries: webinars, href: '/webinars/' },
  { id: 'media', label: 'Media', entries: media, href: '/media/' },
] as const;

export function KnowledgeHub() {
  const [id, setId] = useState<(typeof tabs)[number]['id']>('blogs');
  const tab = tabs.find((t) => t.id === id)!;
  return (
    <section className="kh" aria-labelledby="kh-h">
      <Container>
        <div className="kh__head">
          <div>
            <p className="label eyebrow">Knowledge Hub</p>
            <RevealHeading id="kh-h" className="kh__h" lines={['Latest insights from', 'the industry']} />
          </div>
          <TabList className="kh__tabs" tabClassName="kh__tab" prefix="kh" label="Content type" value={id} onChange={(v) => setId(v as typeof id)} items={tabs.map((t) => ({ id: t.id, label: t.label }))} />
        </div>
        <div id="kh-panel" role="tabpanel" aria-labelledby={`kh-tab-${id}`} tabIndex={0}>
          <ContentGrid entries={[...tab.entries]} label={tab.label} />
        </div>
        <p className="kh__more"><AppLink href={tab.href} className="tlink">View all {tab.label.toLowerCase()}</AppLink></p>
      </Container>
    </section>
  );
}
