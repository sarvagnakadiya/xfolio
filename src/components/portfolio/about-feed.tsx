import { useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { siteURL } from '@lib/env';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { renderTextWithMentions } from '@lib/utils/parse-mentions';

// Static about data - multiple tweet-like entries
const aboutEntries = [
  {
    name: 'Sarvagna Kadiya',
    username: 'sarvagnakadiya',
    text: "hullo!\ngm, I'm Sarvagna Kadiya; buildor, developor, and an aspiring web3 foundor who totally believes\ntheir product will change the world (or at least make a dent) (eventually).\nDefi, AI, payments, crypto—yap; Cars, F1—yap-yap-yap\nI'm your go-to yap buddy for all things buzzword-worthy.\nAwkward on socials, extrovert IRL (yeah, it's a vibe)",
    tags: [
      'Building Web3 applications and DeFi protocols',
      'Available for freelance projects'
    ],
    image:
      'https://pbs.twimg.com/profile_images/1948213553237733376/Gv1W60bF_400x400.jpg',
    video: undefined,
    likes: 68
  },
  {
    name: 'Sarvagna Kadiya',
    username: 'sarvagnakadiya',
    text: 'Building @DCAapp, a Farcaster mini-app that automates DCA (dollar-cost averaging) into tokens. It lets users set up recurring buys and executes them on-chain through cron jobs. A small experiment that actually became useful for people tired of timing the market.',
    tags: ['DCAapp', 'DeFi', 'Automation', 'Farcaster'],
    image:
      'https://pbs.twimg.com/profile_images/1948213553237733376/Gv1W60bF_400x400.jpg',
    video: undefined,
    likes: 420
  },
  {
    name: 'Sarvagna Kadiya',
    username: 'sarvagnakadiya',
    text: 'Currently reading through Uniswap v4 and Hooks, the idea of programmable liquidity is wild. It’s like giving devs cheat codes for AMMs. Trying to wrap my head around how it changes pool design and on-chain UX.',
    tags: ['Uniswap v4', 'Hooks', 'AMMs', 'On-chain Research'],
    image:
      'https://pbs.twimg.com/profile_images/1948213553237733376/Gv1W60bF_400x400.jpg',
    video: undefined,
    likes: 180
  },
  {
    name: 'Sarvagna Kadiya',
    username: 'sarvagnakadiya',
    text: 'Exploring the Solana ecosystem lately, trying out their products exploring rust and how its smart contracts works, Feels like a whole new planet with its own rules.',
    tags: ['Solana', 'Blockchain Infra', 'Ecosystem Research'],
    image:
      'https://pbs.twimg.com/profile_images/1948213553237733376/Gv1W60bF_400x400.jpg',
    video: undefined,
    likes: 142
  },
  {
    name: 'Sarvagna Kadiya',
    username: 'sarvagnakadiya',
    text: 'Built AI agents that analyze on-chain data, trade meme tokens, and sometimes make better decisions than humans (keyword: sometimes). Blending crypto + AI is easily the most fun rabbit hole I’ve fallen into. (tbh lost interest in Ai agents)',
    tags: ['AI Agents', 'On-chain Analysis', 'Trading Automation'],
    image:
      'https://pbs.twimg.com/profile_images/1948213553237733376/Gv1W60bF_400x400.jpg',
    video: undefined,
    likes: 269
  }
];

export function AboutFeed(): JSX.Element {
  // Track like state for each entry
  const [likeStates, setLikeStates] = useState<
    Record<number, { isLiked: boolean; likeCount: number }>
  >({});

  const handleLike =
    (entryIndex: number) =>
    (e: React.MouseEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      const currentState = likeStates[entryIndex] || {
        isLiked: false,
        likeCount: aboutEntries[entryIndex].likes
      };
      const newIsLiked = !currentState.isLiked;
      const newLikeCount = newIsLiked
        ? currentState.likeCount + 1
        : currentState.likeCount - 1;

      setLikeStates((prev) => ({
        ...prev,
        [entryIndex]: { isLiked: newIsLiked, likeCount: newLikeCount }
      }));
    };

  const handleShare = async (
    entryId: string,
    e: React.MouseEvent
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const permalink = `${siteURL}?post=${entryId}&tab=about`;
      await navigator.clipboard.writeText(permalink);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className='space-y-0'>
      {/* Job Search Banner */}
      <div className='border-b border-light-border bg-main-background px-2 py-1 dark:border-dark-border'>
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-main-accent/10'>
            <HeroIcon
              className='h-4 w-4 text-main-accent'
              iconName='InformationCircleIcon'
              solid
            />
          </div>
          <span className='text-sm font-medium text-light-primary dark:text-dark-primary'>
            Actively looking for job as smart contract dev
          </span>
        </div>
      </div>

      {aboutEntries.map((about, index) => {
        const currentLikeState = likeStates[index] || {
          isLiked: false,
          likeCount: about.likes
        };

        return (
          <motion.article
            key={index}
            id={`portfolio-item-about-${index}`}
            className='hover-animation accent-tab border-b border-light-border bg-main-background
                       px-4 py-6 outline-none dark:border-dark-border'
            {...({ tabIndex: 0 } as Record<string, unknown>)}
          >
            <div className='flex gap-4'>
              <div className='flex flex-col items-center gap-2'>
                <div className='relative h-12 w-12 overflow-hidden rounded-full'>
                  <img
                    src={
                      about.image ||
                      'https://pbs.twimg.com/profile_images/1948213553237733376/Gv1W60bF_400x400.jpg'
                    }
                    alt={about.name}
                    className='h-full w-full rounded-full object-cover'
                  />
                </div>
              </div>

              <div className='flex flex-1 flex-col'>
                <div className='flex flex-col gap-1 xs:flex-row xs:items-center xs:gap-1'>
                  <div className='flex items-center gap-1'>
                    <h3 className='text-lg font-bold text-light-primary dark:text-dark-primary xs:text-xl'>
                      {about.name}
                    </h3>
                    <HeroIcon
                      className='h-4 w-4 text-main-accent xs:h-5 xs:w-5'
                      iconName='CheckBadgeIcon'
                      solid
                    />
                  </div>
                  <span className='text-sm text-light-secondary dark:text-dark-secondary xs:text-base'>
                    @{about.username}
                  </span>
                </div>

                <p className='mt-3 whitespace-pre-wrap break-words text-light-primary dark:text-dark-primary'>
                  {renderTextWithMentions(about.text)}
                </p>

                <div className='mt-2 flex flex-wrap gap-2'>
                  {about.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className='rounded-full bg-main-accent/10 px-3 py-1 text-sm font-medium text-main-accent transition-colors hover:bg-main-accent/20'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {about.video && (
                  <div className='mt-3'>
                    <video
                      src={about.video}
                      controls
                      className='w-full max-w-md rounded-lg'
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                <div className='flex items-center justify-between pt-3'>
                  <div className='flex items-center gap-6'>
                    <Button
                      className='group relative flex items-center gap-1 p-2 hover:bg-light-primary/10
                                 focus-visible:bg-light-primary/10 focus-visible:!ring-2
                                 focus-visible:!ring-main-accent/80 dark:hover:bg-dark-primary/10
                                 dark:focus-visible:bg-dark-primary/10'
                      onClick={handleLike(index)}
                    >
                      <HeroIcon
                        className={cn(
                          'h-5 w-5',
                          currentLikeState.isLiked
                            ? 'fill-red-500 text-red-500'
                            : 'text-light-secondary group-hover:text-red-500 group-focus-visible:text-red-500 dark:text-dark-secondary'
                        )}
                        iconName='HeartIcon'
                        solid={currentLikeState.isLiked}
                      />
                      <span className='text-sm text-light-secondary dark:text-dark-secondary'>
                        {currentLikeState.likeCount}
                      </span>
                      <ToolTip tip='just for vibe, nothing happens lol' />
                    </Button>
                  </div>

                  <Button
                    className='group relative flex items-center gap-1 p-2 hover:bg-light-primary/10
                               focus-visible:bg-light-primary/10 focus-visible:!ring-2
                               focus-visible:!ring-main-accent/80 dark:hover:bg-dark-primary/10
                               dark:focus-visible:bg-dark-primary/10'
                    onClick={(e) => handleShare(`about-${index}`, e)}
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
          </motion.article>
        );
      })}
    </div>
  );
}
