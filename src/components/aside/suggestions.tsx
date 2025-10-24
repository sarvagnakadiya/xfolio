import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCard } from '@components/user/user-card';
import { variants } from './aside-trends';

interface SocialData {
  id: string;
  name: string;
  username: string;
  bio: string;
  photoURL: string;
  verified: boolean;
  followers: string;
  following: string;
  website: string;
  location: string;
  joinDate: string;
  url: string;
  icon: string;
  color: string;
}

interface TransformedSocialData {
  id: string;
  name: string;
  username: string;
  bio: string;
  photoURL: string;
  verified: boolean;
  followers: string[];
  following: string[];
  website: string;
  location: string;
  joinDate: string;
  url: string;
  icon: string;
  color: string;
  theme: 'light';
  accent: 'blue';
  pinnedTweet: null;
  totalTweets: number;
  totalPhotos: number;
  totalLikes: number;
  createdAt: Date;
  updatedAt: Date;
  coverPhotoURL: null;
}

export function Suggestions(): JSX.Element {
  const [showAll, setShowAll] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState<
    TransformedSocialData[]
  >([]);

  useEffect(() => {
    const fetchSocials = async (): Promise<void> => {
      try {
        const response = await fetch('/data/socials.json');
        const data = (await response.json()) as SocialData[];
        // Transform data to match UserCard interface
        const transformedData: TransformedSocialData[] = data.map(
          (social: SocialData) => ({
            ...social,
            followers: [social.followers],
            following: [social.following],
            theme: 'light' as const,
            accent: 'blue' as const,
            pinnedTweet: null,
            totalTweets: 0,
            totalPhotos: 0,
            totalLikes: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            coverPhotoURL: null
          })
        );
        setSuggestionsData(transformedData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch socials data:', error);
        setSuggestionsData([]);
      }
    };

    void fetchSocials();
  }, []);

  const displayData = showAll ? suggestionsData : suggestionsData.slice(0, 3);

  return (
    <section className='hover-animation rounded-2xl bg-main-sidebar-background'>
      <motion.div className='inner:px-4 inner:py-3' {...variants}>
        <h2 className='text-xl font-bold'>Socials</h2>
        {displayData.map((userData) => (
          <UserCard {...userData} key={userData.id} />
        ))}
        {!showAll && suggestionsData.length > 3 && (
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
