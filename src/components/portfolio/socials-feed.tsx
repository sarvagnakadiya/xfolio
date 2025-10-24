import { useState, useEffect } from 'react';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import type { IconName } from '@components/ui/hero-icon';

interface SocialLink {
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

export function SocialsFeed(): JSX.Element {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchSocials = async (): Promise<void> => {
      try {
        const response = await fetch('/data/socials.json');
        const data = (await response.json()) as SocialLink[];
        setSocials(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch social links:', error);
        setSocials([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchSocials();
  }, []);

  const handleImageError = (index: number): void => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  if (loading)
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-gray-500'>Loading social links...</p>
      </div>
    );
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
          <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full'>
            {social.photoURL && !imageErrors.has(index) ? (
              <img
                src={social.photoURL}
                alt={social.name}
                className='h-full w-full object-cover'
                onError={() => handleImageError(index)}
                onLoad={() => {
                  // Image loaded successfully, ensure it's not in error state
                  setImageErrors((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(index);
                    return newSet;
                  });
                }}
              />
            ) : (
              <div
                className='flex h-full w-full items-center justify-center'
                style={{ backgroundColor: social.color }}
              >
                <HeroIcon
                  className='h-6 w-6 text-white'
                  iconName={social.icon as IconName}
                />
              </div>
            )}
          </div>
          <span className='text-xs font-medium text-light-primary dark:text-dark-primary xs:text-sm'>
            {social.name}
          </span>
          <ToolTip tip={`Visit ${social.name}`} />
        </Button>
      ))}
    </div>
  );
}
