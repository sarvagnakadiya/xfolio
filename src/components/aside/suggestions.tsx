import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCard } from '@components/user/user-card';
import { variants } from './aside-trends';

export function Suggestions(): JSX.Element {
  const [showAll, setShowAll] = useState(false);
  // Static follow suggestions data
  const suggestionsData = [
    {
      id: '1',
      name: 'GitHub',
      username: 'github',
      bio: 'How people build software.',
      photoURL:
        'https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_400x400.png',
      verified: true,
      followers: ['2.1M'],
      following: ['12'],
      theme: 'light' as const,
      accent: 'blue' as const,
      website: 'https://github.com',
      location: 'San Francisco, CA',
      joinDate: '2008-02-08',
      pinnedTweet: null,
      totalTweets: 0,
      totalPhotos: 0,
      totalLikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      coverPhotoURL: null,
      url: 'https://github.com/sarvagnakadiya'
    },
    {
      id: '2',
      name: 'LinkedIn',
      username: 'linkedin',
      bio: "Welcome to the world's largest professional network.",
      photoURL:
        'https://pbs.twimg.com/profile_images/1661161645857710081/6WtDIesg_400x400.png',
      verified: true,
      followers: ['890K'],
      following: ['15'],
      theme: 'light' as const,
      accent: 'blue' as const,
      website: 'https://linkedin.com',
      location: 'Sunnyvale, CA',
      joinDate: '2003-05-05',
      pinnedTweet: null,
      totalTweets: 0,
      totalPhotos: 0,
      totalLikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      coverPhotoURL: null,
      url: 'https://linkedin.com/in/sarvagnakadiya'
    },
    {
      id: '3',
      name: 'Farcaster',
      username: 'farcaster',
      bio: 'A sufficiently decentralized social network.',
      photoURL:
        'https://pbs.twimg.com/profile_images/1980310281558409216/DWoYcKR7_400x400.jpg',
      verified: true,
      followers: ['234K'],
      following: ['12'],
      theme: 'light' as const,
      accent: 'purple' as const,
      website: 'https://farcaster.xyz',
      location: 'San Francisco, CA',
      joinDate: '2020-01-01',
      pinnedTweet: null,
      totalTweets: 0,
      totalPhotos: 0,
      totalLikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      coverPhotoURL: null,
      url: 'https://farcaster.xyz/sarvagna'
    },
    {
      id: '4',
      name: 'Telegram',
      username: 'telegram',
      bio: 'A new era of messaging.',
      photoURL:
        'https://pbs.twimg.com/profile_images/1183117696730390529/LRDASku7_400x400.jpg',
      verified: true,
      followers: ['800M'],
      following: ['5'],
      theme: 'light' as const,
      accent: 'blue' as const,
      website: 'https://telegram.org',
      location: 'Dubai, UAE',
      joinDate: '2013-08-14',
      pinnedTweet: null,
      totalTweets: 0,
      totalPhotos: 0,
      totalLikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      coverPhotoURL: null,
      url: 'https://t.me/sarvagnakadiya'
    },
    {
      id: '5',
      name: 'X (Twitter)',
      username: 'sarvagnakadiya',
      bio: "What's happening?",
      photoURL:
        'https://pbs.twimg.com/profile_images/1683498543967879173/EHRSRyrp_400x400.jpg',
      verified: true,
      followers: ['1.2K'],
      following: ['234'],
      theme: 'light' as const,
      accent: 'blue' as const,
      website: 'https://twitter.com',
      location: 'San Francisco, CA',
      joinDate: '2020-01-01',
      pinnedTweet: null,
      totalTweets: 0,
      totalPhotos: 0,
      totalLikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      coverPhotoURL: null,
      url: 'https://x.com/sarvagnakadiya'
    }
  ];

  const displayData = showAll ? suggestionsData : suggestionsData.slice(0, 3);

  return (
    <section className='hover-animation rounded-2xl bg-main-sidebar-background'>
      <motion.div className='inner:px-4 inner:py-3' {...variants}>
        <h2 className='text-xl font-bold'>Socials</h2>
        {displayData.map((userData) => (
          <UserCard {...userData} key={userData.id} />
        ))}
        {!showAll && (
          <div
            className='custom-button accent-tab hover-card block w-full cursor-pointer
                       rounded-2xl rounded-t-none text-center text-main-accent'
            onClick={(): void => {
              setShowAll(true);
            }}
          >
            Show more
          </div>
        )}
      </motion.div>
    </section>
  );
}
