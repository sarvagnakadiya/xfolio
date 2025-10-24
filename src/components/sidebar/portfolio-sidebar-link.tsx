import cn from 'clsx';
import { preventBubbling } from '@lib/utils';
import { usePortfolio } from '@lib/context/portfolio-context';
import { HeroIcon } from '@components/ui/hero-icon';
import type { IconName } from '@components/ui/hero-icon';

type PortfolioSidebarLinkProps = {
  href: string;
  iconName: IconName;
  linkName: string;
  tabName: string;
  disabled?: boolean;
  canBeHidden?: boolean;
};

export function PortfolioSidebarLink({
  href,
  iconName,
  linkName,
  tabName,
  disabled,
  canBeHidden
}: PortfolioSidebarLinkProps): JSX.Element {
  const { activeTab, setActiveTab } = usePortfolio();
  const isActive = activeTab === tabName;

  return (
    <button
      onClick={disabled ? preventBubbling() : () => setActiveTab(tabName)}
      className={cn(
        'group py-1 outline-none',
        canBeHidden ? 'hidden xs:flex' : 'flex',
        disabled && 'cursor-not-allowed'
      )}
    >
      <div
        className={cn(
          `custom-button flex items-center justify-center gap-4 self-start p-2 text-xl transition 
           duration-200 group-hover:bg-light-primary/10 group-focus-visible:ring-2 
           group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
           dark:group-focus-visible:ring-white xs:p-3 xl:pr-5`,
          isActive && 'font-bold'
        )}
      >
        <HeroIcon
          className={cn(
            'h-7 w-7',
            isActive &&
              ['Explore', 'Lists'].includes(linkName) &&
              'stroke-white'
          )}
          iconName={iconName}
          solid={isActive}
        />
        <p className='hidden xl:block'>{linkName}</p>
      </div>
    </button>
  );
}
