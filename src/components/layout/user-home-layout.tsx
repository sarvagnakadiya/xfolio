import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@lib/context/user-context';
import { SEO } from '@components/common/seo';
// Removed user home cover and avatar imports
import { UserDetails } from '@components/user/user-details';
// Removed UserNav import since we're using PortfolioContainer navigation
import { Button } from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { UserShare } from '@components/user/user-share';
import { Popover } from '@headlessui/react';
import cn from 'clsx';
// Removed variants import
import type { LayoutProps } from './common-layout';

export function UserHomeLayout({ children }: LayoutProps): JSX.Element {
  const { user: userData, loading } = useUser();

  const {
    query: { id }
  } = useRouter();

  const coverData = userData?.coverPhotoURL
    ? { src: userData.coverPhotoURL, alt: userData.name }
    : null;

  const profileData = userData
    ? { src: userData.photoURL, alt: userData.name }
    : null;

  return (
    <>
      {userData && (
        <SEO
          title={`${`${userData.name} (@${userData.username})`} / Portfolio`}
        />
      )}
      <motion.section exit={undefined}>
        {loading ? (
          <Loading className='mt-5' />
        ) : !userData ? (
          <>
            <div className='h-48 bg-main-sidebar-background' />
            <div className='flex flex-col gap-8'>
              <div className='relative flex flex-col gap-3 px-4 py-3'>
                <div className='h-16 w-16 rounded-full bg-main-sidebar-background' />
                <p className='text-xl font-bold'>@{id}</p>
              </div>
              <div className='p-8 text-center'>
                <p className='text-3xl font-bold'>
                  This portfolio doesn&apos;t exist
                </p>
                <p className='text-light-secondary dark:text-dark-secondary'>
                  Try searching for another.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='relative h-48 overflow-hidden'>
              {userData.coverPhotoURL ? (
                <img
                  src={userData.coverPhotoURL}
                  alt='Cover'
                  className='h-full w-full object-cover'
                />
              ) : (
                <div className='h-full w-full bg-main-sidebar-background' />
              )}
            </div>
            <div className='relative flex flex-col gap-3 px-4 py-3'>
              <div className='flex justify-between'>
                <div className='relative -mt-20'>
                  {userData.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt={userData.name}
                      className='h-32 w-32 rounded-full border-4 border-main-background object-cover'
                    />
                  ) : (
                    <div className='h-32 w-32 rounded-full bg-main-sidebar-background' />
                  )}
                </div>
                <div className='flex gap-2 self-start'>
                  <UserShare username={userData.username} />
                  <Popover className='relative'>
                    {({ open, close }): JSX.Element => (
                      <>
                        <Popover.Button
                          as={Button}
                          className={cn(
                            `dark-bg-tab group relative border border-light-line-reply p-2
                             hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary
                             dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20`,
                            open &&
                              'bg-light-primary/10 dark:bg-dark-primary/10'
                          )}
                        >
                          <HeroIcon
                            className='h-5 w-5'
                            iconName='EnvelopeIcon'
                          />
                          {!open && <ToolTip tip='Message' />}
                        </Popover.Button>
                        <AnimatePresence>
                          {open && (
                            <Popover.Panel
                              className='menu-container group absolute right-0 top-11 whitespace-nowrap
                                         text-light-primary dark:text-dark-primary'
                              as={motion.div}
                              static
                            >
                              <Popover.Button
                                className='flex w-full gap-3 rounded-md rounded-b-none p-4 hover:bg-main-sidebar-background'
                                as={Button}
                                onClick={(): void => {
                                  window.open(
                                    'https://x.com/messages/compose?recipient_id=1048316313251115008',
                                    '_blank'
                                  );
                                  close();
                                }}
                              >
                                <HeroIcon iconName='ChatBubbleLeftRightIcon' />
                                Message on X
                              </Popover.Button>
                              <Popover.Button
                                className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                                as={Button}
                                onClick={(): void => {
                                  window.open(
                                    'https://t.me/sarvagnakadiya',
                                    '_blank'
                                  );
                                  close();
                                }}
                              >
                                <HeroIcon iconName='PaperAirplaneIcon' />
                                Message on Telegram
                              </Popover.Button>
                            </Popover.Panel>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </Popover>
                  <Button
                    className='dark-bg-tab group relative cursor-pointer border border-light-line-reply p-2
                                   hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary
                                   dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
                    onClick={(): void => {
                      window.open('/resume.pdf', '_blank');
                    }}
                  >
                    <HeroIcon className='h-5 w-5' iconName='DocumentTextIcon' />
                    <ToolTip tip='View Resume' />
                  </Button>
                </div>
              </div>
              <UserDetails {...userData} />
            </div>
          </>
        )}
      </motion.section>
      {userData && <>{children}</>}
    </>
  );
}
