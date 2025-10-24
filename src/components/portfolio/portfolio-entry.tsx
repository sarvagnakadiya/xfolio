import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { preventBubbling } from '@lib/utils';
import { siteURL } from '@lib/env';
import { usePortfolio } from '@lib/context/portfolio-context';
import { NextImage } from '@components/ui/next-image';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import type { IconName } from '@components/ui/hero-icon';

export interface PortfolioEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image?: string;
  likes: number;
  location?: string;
  technologies?: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  verified?: boolean;
  type?: string;
  category?: string;
  level?: string;
  years?: string;
  projects?: number;
  gpa?: string;
  certificate?: boolean;
  youtubeId?: string;
  skills?: string[];
  tweetUrl?: string;
  tweetId?: string;
}

interface PortfolioEntryProps {
  entry: PortfolioEntry;
  type:
    | 'tweet'
    | 'highlight'
    | 'work'
    | 'education'
    | 'project'
    | 'skill'
    | 'about';
  activeTab?: string;
}

export function PortfolioEntry({
  entry,
  type,
  activeTab
}: PortfolioEntryProps): JSX.Element {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(entry.likes);
  const { activeTab: contextActiveTab } = usePortfolio();

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
      const permalink = `${siteURL}?post=${entry.id}&tab=${
        activeTab || contextActiveTab || 'about'
      }`;
      await navigator.clipboard.writeText(permalink);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  // const formatDate = (dateStr: string): string => {
  //   try {
  //     const date = new Date(dateStr);
  //     return formatDistanceToNow(date, { addSuffix: true });
  //   } catch {
  //     return dateStr;
  //   }
  // };

  const getEntryIcon = (): IconName => {
    switch (type) {
      case 'tweet':
        return 'ChatBubbleLeftRightIcon';
      case 'highlight':
        return 'StarIcon';
      case 'work':
        return 'BriefcaseIcon';
      case 'education':
        return 'AcademicCapIcon';
      case 'project':
        return 'CodeBracketIcon';
      case 'skill':
        return 'CogIcon';
      default:
        return 'DocumentTextIcon';
    }
  };

  return (
    <motion.article
      id={`portfolio-item-${entry.id}`}
      className='hover-animation accent-tab border-b border-light-border bg-main-background
                 px-4 py-3 outline-none dark:border-dark-border'
      {...({ tabIndex: 0 } as Record<string, unknown>)}
    >
      <div className='flex gap-3'>
        <div className='flex flex-col items-center gap-2'>
          <div className='group relative flex h-10 w-10 items-center justify-center rounded-full bg-main-accent'>
            <HeroIcon
              className='h-5 w-5 text-white'
              iconName={getEntryIcon()}
            />
          </div>
          {entry.image && (
            <div className='relative h-12 w-12 overflow-hidden rounded-full'>
              <NextImage
                src={entry.image}
                alt={entry.title}
                layout='fill'
                className='rounded-full object-cover'
              />
            </div>
          )}
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex items-center gap-1'>
            <h3 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
              {entry.title}
            </h3>
            {entry.featured && (
              <HeroIcon
                className='h-4 w-4 text-main-accent'
                iconName='StarIcon'
                solid
              />
            )}
            {entry.verified && (
              <HeroIcon
                className='h-4 w-4 text-main-accent'
                iconName='CheckBadgeIcon'
                solid
              />
            )}
          </div>

          <div className='flex flex-col gap-1 text-light-secondary dark:text-dark-secondary sm:flex-row sm:items-center sm:gap-2'>
            <span className='text-sm'>{entry.subtitle}</span>
            {entry.date && (
              <div className='flex items-center gap-2'>
                <span className='hidden text-xs sm:inline'>·</span>
                <span className='text-sm'>{entry.date}</span>
              </div>
            )}
            {entry.location && (
              <div className='flex items-center gap-2'>
                <span className='hidden text-xs sm:inline'>·</span>
                <span className='text-sm'>{entry.location}</span>
              </div>
            )}
          </div>

          <p className='whitespace-pre-wrap break-words text-light-primary dark:text-dark-primary'>
            {entry.description}
          </p>

          {entry.technologies && entry.technologies.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {entry.technologies.map((tech) => (
                <span
                  key={tech}
                  className='rounded-full bg-main-accent/10 px-2 py-1 text-xs text-main-accent'
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {entry.skills && entry.skills.length > 0 && type !== 'project' && (
            <div className='flex flex-wrap gap-1'>
              {entry.skills.map((skill) => (
                <span
                  key={skill}
                  className='rounded-full bg-main-accent/10 px-2 py-1 text-xs text-main-accent'
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {entry.youtubeId && (
            <div className='mt-4'>
              <div
                className='relative w-full overflow-hidden rounded-lg'
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  className='absolute top-0 left-0 h-full w-full'
                  src={`https://www.youtube.com/embed/${entry.youtubeId}`}
                  title={`${entry.title} - YouTube Video`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {(entry.github || entry.demo) && (
            <div className='flex gap-4'>
              {entry.github && (
                <a
                  href={entry.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-main-accent hover:underline'
                  onClick={preventBubbling()}
                >
                  <HeroIcon
                    className='mr-1 inline h-4 w-4'
                    iconName='CodeBracketIcon'
                  />
                  GitHub
                </a>
              )}
              {entry.demo && (
                <a
                  href={entry.demo}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-main-accent hover:underline'
                  onClick={preventBubbling()}
                >
                  <HeroIcon
                    className='mr-1 inline h-4 w-4'
                    iconName='GlobeAltIcon'
                  />
                  Live Demo
                </a>
              )}
            </div>
          )}

          <div className='flex items-center justify-between pt-2'>
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
                {entry.level && <span>Level: {entry.level}</span>}
                {entry.years && <span>{entry.years} years</span>}
                {entry.projects && <span>{entry.projects} projects</span>}
                {entry.gpa && <span>GPA: {entry.gpa}</span>}
                {entry.certificate && (
                  <span className='text-main-accent'>
                    <HeroIcon
                      className='mr-1 inline h-4 w-4'
                      iconName='AcademicCapIcon'
                    />
                    Certificate
                  </span>
                )}
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
