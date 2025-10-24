import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { siteURL } from '@lib/env';
import { usePortfolio } from '@lib/context/portfolio-context';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import type { IconName } from '@components/ui/hero-icon';

export interface SkillsEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  likes: number;
  location?: string;
  verified?: boolean;
  category?: string;
  skills?: string[];
  icon?: string;
  color?: string;
}

interface SkillsEntryProps {
  entry: SkillsEntry;
}

export function SkillsEntry({ entry }: SkillsEntryProps): JSX.Element {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(entry.likes);

  const handleLike = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) setLikeCount(likeCount - 1);
    else setLikeCount(likeCount + 1);
    setIsLiked(!isLiked);
  };

  const handleShare = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const permalink = `${siteURL}?post=${entry.id}&tab=skills`;
      await navigator.clipboard.writeText(permalink);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  const getCategoryIcon = (): IconName => {
    switch (entry.icon) {
      case 'CodeBracketIcon':
        return 'CodeBracketIcon';
      case 'ComputerDesktopIcon':
        return 'ComputerDesktopIcon';
      case 'ServerIcon':
        return 'ServerIcon';
      case 'CircleStackIcon':
        return 'CircleStackIcon';
      case 'CpuChipIcon':
        return 'CpuChipIcon';
      default:
        return 'CogIcon';
    }
  };

  const getColorClass = (): string => {
    switch (entry.color) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'purple':
        return 'bg-purple-500';
      case 'orange':
        return 'bg-orange-500';
      case 'teal':
        return 'bg-teal-500';
      case 'pink':
        return 'bg-pink-500';
      default:
        return 'bg-main-accent';
    }
  };

  return (
    <motion.article
      className='hover-animation accent-tab border-b border-light-border bg-main-background
                 px-4 py-6 outline-none dark:border-dark-border'
      {...({ tabIndex: 0 } as Record<string, unknown>)}
    >
      <div className='flex gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <div
            className={cn(
              'group relative flex h-12 w-12 items-center justify-center rounded-full',
              getColorClass()
            )}
          >
            <HeroIcon
              className='h-6 w-6 text-white'
              iconName={getCategoryIcon()}
            />
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <h3 className='truncate text-lg font-bold text-light-primary dark:text-dark-primary xs:text-xl'>
              {entry.title}
            </h3>
            {entry.verified && (
              <HeroIcon
                className='h-4 w-4 flex-shrink-0 text-main-accent xs:h-5 xs:w-5'
                iconName='CheckBadgeIcon'
                solid
              />
            )}
          </div>

          <div className='flex items-center gap-2 text-light-secondary dark:text-dark-secondary'>
            <span className='text-xs font-medium xs:text-sm'>
              {entry.subtitle}
            </span>
            {entry.location && (
              <>
                <span className='text-xs'>·</span>
                <span className='text-xs xs:text-sm'>{entry.location}</span>
              </>
            )}
          </div>

          <p className='whitespace-pre-wrap break-words text-sm text-light-primary dark:text-dark-primary xs:text-base'>
            {entry.description}
          </p>

          {entry.skills && entry.skills.length > 0 && (
            <div className='mt-2 flex flex-wrap gap-2'>
              {entry.skills.map((skill) => (
                <span
                  key={skill}
                  className='rounded-full bg-main-accent/10 px-3 py-1 text-sm font-medium text-main-accent transition-colors hover:bg-main-accent/20'
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className='flex items-center justify-between pt-3'>
            <div className='flex items-center gap-6'>
              <Button
                className='group relative flex items-center gap-1 p-2 hover:bg-light-primary/10
                           focus-visible:bg-light-primary/10 focus-visible:!ring-2
                           focus-visible:!ring-main-accent/80 dark:hover:bg-dark-primary/10
                           dark:focus-visible:bg-dark-primary/10'
                onClick={handleLike}
              >
                <HeroIcon
                  className={cn(
                    'h-5 w-5',
                    isLiked
                      ? 'fill-red-500 text-red-500'
                      : 'text-light-secondary group-hover:text-red-500 group-focus-visible:text-red-500 dark:text-dark-secondary'
                  )}
                  iconName='HeartIcon'
                  solid={isLiked}
                />
                <span className='text-sm text-light-secondary dark:text-dark-secondary'>
                  {likeCount}
                </span>
                <ToolTip tip='just for vibe, nothing happens lol' />
              </Button>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-4 text-sm text-light-secondary dark:text-dark-secondary'>
                {entry.category && <span>Category: {entry.category}</span>}
              </div>

              <Button
                className='group relative flex items-center gap-1 p-2 hover:bg-light-primary/10
                           focus-visible:bg-light-primary/10 focus-visible:!ring-2
                           focus-visible:!ring-main-accent/80 dark:hover:bg-dark-primary/10
                           dark:focus-visible:bg-dark-primary/10'
                onClick={handleShare}
              >
                <HeroIcon
                  className='h-5 w-5 text-light-secondary group-hover:text-main-accent
                             group-focus-visible:text-main-accent dark:text-dark-secondary'
                  iconName='ArrowUpTrayIcon'
                />
                <ToolTip tip='Share' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
