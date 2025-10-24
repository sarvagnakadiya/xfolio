import { useState } from 'react';
import cn from 'clsx';
import { usePortfolio } from '@lib/context/portfolio-context';
import { useWindow } from '@lib/context/window-context';

type PortfolioNavLinkProps = {
  name: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
};

export function PortfolioNavLink({
  name,
  path,
  isActive,
  onClick
}: PortfolioNavLinkProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className='hover-animation main-tab dark-bg-tab flex flex-1 justify-center
                 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
    >
      <div className='px-6 md:px-8'>
        <p
          className={cn(
            'flex flex-col gap-3 whitespace-nowrap pt-3 font-bold transition-colors duration-200',
            isActive
              ? 'text-light-primary dark:text-dark-primary [&>i]:scale-100 [&>i]:opacity-100'
              : 'text-light-secondary dark:text-dark-secondary'
          )}
        >
          {name}
          <i className='h-1 scale-50 rounded-full bg-main-accent opacity-0 transition duration-200' />
        </p>
      </div>
    </button>
  );
}

export function PortfolioNavigation(): JSX.Element {
  const { activeTab, setActiveTab } = usePortfolio();
  const { isMobile } = useWindow();

  const baseNavLinks = [
    { name: 'About', path: 'about' },
    { name: 'Work', path: 'work' },
    { name: 'Projects', path: 'projects' },
    { name: 'Education', path: 'education' },
    { name: 'Skills', path: 'skills' }
  ];

  // Add socials tab for mobile screens
  const navLinks = isMobile
    ? [...baseNavLinks, { name: 'Socials', path: 'socials' }]
    : baseNavLinks;

  return (
    <nav className='hover-animation hide-scrollbar relative z-50 flex justify-between overflow-y-auto border-b border-light-border bg-main-background dark:border-dark-border'>
      {navLinks.map(({ name, path }) => (
        <PortfolioNavLink
          key={path}
          name={name}
          path={path}
          isActive={activeTab === path}
          onClick={() => setActiveTab(path)}
        />
      ))}
    </nav>
  );
}
