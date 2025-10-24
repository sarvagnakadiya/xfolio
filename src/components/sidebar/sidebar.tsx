import Link from 'next/link';
import { useWindow } from '@lib/context/window-context';
import { usePortfolio } from '@lib/context/portfolio-context';
import { CustomIcon } from '@components/ui/custom-icon';
import { ClientOnly } from '@components/common/client-only';
import { PortfolioSidebarLink } from './portfolio-sidebar-link';
// Removed more settings import
import { SidebarProfile } from './sidebar-profile';
import type { IconName } from '@components/ui/hero-icon';

export type NavLink = {
  href: string;
  linkName: string;
  iconName: IconName;
  disabled?: boolean;
  canBeHidden?: boolean;
};

const navLinks: Readonly<NavLink[]> = [
  {
    href: '/portfolio',
    linkName: 'About',
    iconName: 'StarIcon'
  },
  {
    href: '/portfolio',
    linkName: 'Work',
    iconName: 'BriefcaseIcon'
  },
  {
    href: '/portfolio',
    linkName: 'Projects',
    iconName: 'CodeBracketIcon'
  },
  {
    href: '/portfolio',
    linkName: 'Education',
    iconName: 'AcademicCapIcon'
  },
  {
    href: '/portfolio',
    linkName: 'Skills',
    iconName: 'CogIcon'
  }
];

export function Sidebar(): JSX.Element {
  const { isMobile } = useWindow();
  const { activeTab, setActiveTab } = usePortfolio();

  return (
    <header
      id='sidebar'
      className='flex w-0 shrink-0 transition-opacity duration-200 xs:w-20 md:w-24
                 lg:max-w-none xl:-mr-4 xl:w-full xl:max-w-xs xl:justify-end'
    >
      <div
        className='fixed bottom-0 z-10 flex w-full flex-col justify-between border-t border-light-border 
                   bg-main-background py-0 dark:border-dark-border xs:top-0 xs:h-full xs:w-auto xs:border-0 
                   xs:bg-transparent xs:px-2 xs:py-3 xs:pt-2 md:px-4 xl:w-72'
      >
        <section className='flex flex-col justify-center gap-2 xs:items-center xl:items-stretch'>
          <h1 className='hidden xs:flex'>
            <Link href='/'>
              <a
                className='stick-regular custom-button main-tab flex h-12 w-12 
                           items-center justify-center
                           text-2xl
                           font-bold text-accent-blue transition focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 dark:text-twitter-icon dark:hover:bg-dark-primary/10'
              >
                √sqrt
              </a>
            </Link>
          </h1>
          <nav className='flex items-center justify-around xs:flex-col xs:justify-center xl:block'>
            <ClientOnly>
              {navLinks.map(({ ...linkData }) => (
                <PortfolioSidebarLink
                  {...linkData}
                  key={linkData.href + linkData.linkName}
                  tabName={linkData.linkName.toLowerCase()}
                />
              ))}
            </ClientOnly>
          </nav>
        </section>
        {!isMobile && <SidebarProfile />}
      </div>
    </header>
  );
}
