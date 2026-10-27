/** Navigation structure and URLs audited from the live site (26 Oct 2026). Keep labels/links as published. */
export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href: string; items: NavLink[] };
export type NavItem =
  | { id: string; label: string; href: string }
  | { id: string; label: string; links: NavLink[] }
  | { id: string; label: string; href: string; groups: NavGroup[] };

export const navItems: NavItem[] = [
  {
    id: 'about', label: 'About',
    links: [{ label: 'Company Overview', href: '/about/' }, { label: 'Media & Awards', href: '/media/' }],
  },
  {
    id: 'solutions', label: 'Solutions', href: '/solutions/',
    groups: [
      {
        label: 'RE RTC Solutions', href: '/solutions/re-100-solutions/',
        items: [
          { label: 'RTC Power', href: '/solutions/re-100-solutions/?servid=box_263_lt1' },
          { label: 'Energy Storage', href: '/solutions/re-100-solutions/?servid=box_263_lt2' },
          { label: 'Green Attributes', href: '/solutions/re-100-solutions/?servid=box_263_lt3' },
        ],
      },
      {
        label: 'Green Energy Open Access', href: '/solutions/green-energy-off-site/',
        items: [
          { label: 'Hybrid PPAs', href: '/solutions/green-energy-off-site/?tabid=sub_services_tab_1&servid=v2_tab_section' },
          { label: 'Solar PPAs', href: '/solutions/green-energy-off-site/?tabid=sub_services_tab_2&servid=v2_tab_section' },
          { label: 'Wind PPAs', href: '/solutions/green-energy-off-site/?tabid=sub_services_tab_3&servid=v2_tab_section' },
        ],
      },
    ],
  },
  { id: 'projects', label: 'Projects', href: '/projects/' },
  {
    id: 'careers', label: 'Careers',
    links: [{ label: 'Careers at Sunsure', href: '/careers-hiring/' }, { label: 'Job Openings', href: '/job-openings/' }],
  },
  {
    id: 'knowledge', label: 'Knowledge Hub',
    links: [{ label: 'Blogs', href: '/blogs/' }, { label: 'Webinars', href: '/webinars/' }],
  },
];

export const headerCta: NavLink = { label: 'Contact Us', href: '/contact/' };
