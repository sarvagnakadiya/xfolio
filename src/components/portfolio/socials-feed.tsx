import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { preventBubbling } from '@lib/utils';
import type { IconName } from '@components/ui/hero-icon';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface SocialsFeedProps {
  socials: SocialLink[];
}

export function SocialsFeed({ socials }: SocialsFeedProps): JSX.Element {
  if (!socials || socials.length === 0) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-gray-500'>No social links available</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4'>
      {socials.map((social, index) => (
        <Button
          key={index}
          className='group relative flex flex-col items-center gap-2 p-4 hover:bg-light-primary/10 
                     focus-visible:bg-light-primary/10 focus-visible:!ring-2
                     focus-visible:!ring-main-accent/80 dark:hover:bg-dark-primary/10
                     dark:focus-visible:bg-dark-primary/10'
          onClick={() => {
            window.open(social.url, '_blank', 'noopener,noreferrer');
          }}
        >
          <div
            className='flex h-12 w-12 items-center justify-center rounded-full'
            style={{ backgroundColor: social.color }}
          >
            <HeroIcon
              className='h-6 w-6 text-white'
              iconName={social.icon as IconName}
            />
          </div>
          <span className='text-sm font-medium text-light-primary dark:text-dark-primary'>
            {social.name}
          </span>
          <ToolTip tip={`Visit ${social.name}`} />
        </Button>
      ))}
    </div>
  );
}
