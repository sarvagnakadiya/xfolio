import cn from 'clsx';
import { motion } from 'framer-motion';
import { formatNumber } from '@lib/date';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import type { MotionProps } from 'framer-motion';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideTrendsProps = {
  inTrendsPage?: boolean;
};

export function AsideTrends({ inTrendsPage }: AsideTrendsProps): JSX.Element {
  // Static trending skills data
  const trends = [
    {
      name: 'React 18',
      query: 'react18',
      volume: 15420,
      category: 'Frontend'
    },
    {
      name: 'TypeScript',
      query: 'typescript',
      volume: 12890,
      category: 'Programming'
    },
    {
      name: 'Next.js',
      query: 'nextjs',
      volume: 11250,
      category: 'Framework'
    },
    {
      name: 'Web3',
      query: 'web3',
      volume: 9870,
      category: 'Technology'
    },
    {
      name: 'AI/ML',
      query: 'aiml',
      volume: 8765,
      category: 'Technology'
    },
    {
      name: 'Tailwind CSS',
      query: 'tailwindcss',
      volume: 7654,
      category: 'Styling'
    },
    {
      name: 'GraphQL',
      query: 'graphql',
      volume: 6543,
      category: 'API'
    },
    {
      name: 'Docker',
      query: 'docker',
      volume: 5432,
      category: 'DevOps'
    }
  ];

  // const location = 'Tech Community';

  return (
    <section
      className={cn(
        !inTrendsPage &&
          'hover-animation rounded-2xl bg-main-sidebar-background'
      )}
    >
      <motion.div
        className={cn('inner:px-4 inner:py-3', inTrendsPage && 'mt-0.5')}
        {...variants}
      >
        {!inTrendsPage && (
          <h2 className='text-xl font-extrabold'>Trending Skills</h2>
        )}
        {trends.map(({ name, query, volume, category }) => (
          <div
            key={query}
            className='hover-animation accent-tab hover-card relative flex cursor-pointer flex-col gap-0.5'
          >
            <div className='absolute right-2 top-2'>
              <Button
                className='hover-animation group relative cursor-pointer p-2
                           hover:bg-accent-blue/10 focus-visible:bg-accent-blue/20 
                           focus-visible:!ring-accent-blue/80'
                onClick={(): void => {
                  window.open(`https://github.com/search?q=${query}`, '_blank');
                }}
              >
                <HeroIcon
                  className='h-5 w-5 text-light-secondary group-hover:text-accent-blue 
                             group-focus-visible:text-accent-blue dark:text-dark-secondary'
                  iconName='ArrowTopRightOnSquareIcon'
                />
                <ToolTip tip='View on GitHub' />
              </Button>
            </div>
            <p className='text-sm text-light-secondary dark:text-dark-secondary'>
              Trending in {category}
            </p>
            <p className='font-bold'>{name}</p>
            <p className='text-sm text-light-secondary dark:text-dark-secondary'>
              {formatNumber(volume)} developers
            </p>
          </div>
        ))}
        {!inTrendsPage && (
          <div
            className='custom-button accent-tab hover-card block w-full cursor-pointer rounded-2xl rounded-t-none text-center text-main-accent'
            onClick={(): void => {
              window.open('https://github.com/trending', '_blank');
            }}
          >
            Show more
          </div>
        )}
      </motion.div>
    </section>
  );
}
