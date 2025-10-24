import cn from 'clsx';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
// Removed mobile sidebar import
import type { ReactNode } from 'react';
import type { IconName } from '@components/ui/hero-icon';

type HomeHeaderProps = {
  tip?: string;
  title?: string;
  children?: ReactNode;
  iconName?: IconName;
  className?: string;
  disableSticky?: boolean;
  useActionButton?: boolean;
  action?: () => void;
};

export function MainHeader({
  tip,
  title,
  children,
  iconName,
  className,
  disableSticky,
  useActionButton,
  action
}: HomeHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        'hover-animation even z-10 bg-main-background/60 px-4 py-2 backdrop-blur-md',
        !disableSticky && 'sticky top-0',
        className ?? 'flex items-center gap-6'
      )}
    >
      {useActionButton && (
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <Button
              className='dark-bg-tab group relative p-2 hover:bg-light-primary/10 active:bg-light-primary/20 
                         dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
              onClick={action}
            >
              <HeroIcon
                className='h-5 w-5'
                iconName={iconName ?? 'ArrowLeftIcon'}
              />
              <ToolTip tip={tip ?? 'Back'} />
            </Button>
            <div className='gap-0.1 flex flex-col'>
              <div className='flex items-center gap-1'>
                <span className='text-lg font-bold text-light-primary dark:text-dark-primary xs:text-xl'>
                  sqrt.base.eth
                </span>
                <HeroIcon
                  className='h-4 w-4 text-main-accent xs:h-5 xs:w-5'
                  iconName='CheckBadgeIcon'
                  solid
                />
              </div>
              <p className='font-mono text-[10px] text-light-secondary dark:text-dark-secondary'>
                0xEA380ddC224497dfFe5871737E12136d3968af15
              </p>
            </div>
          </div>
        </div>
      )}
      {title && (
        <div className='flex gap-8'>
          <h2 className='text-xl font-bold' key={title}>
            {title}
          </h2>
        </div>
      )}
      {children}
    </header>
  );
}
