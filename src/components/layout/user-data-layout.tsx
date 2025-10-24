import { useRouter } from 'next/router';
import { UserContextProvider } from '@lib/context/user-context';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
// Removed user header import
import type { LayoutProps } from './common-layout';

export function UserDataLayout({ children }: LayoutProps): JSX.Element {
  const {
    query: { id: _id },
    back
  } = useRouter();

  // Suppress unused variable warning
  void _id;

  // Static user data for portfolio
  const user = {
    id: 'portfolio-user',
    name: 'Sarvagna Kadiya',
    username: 'sarvagnakadiya',
    bio: 'Full-stack developer passionate about creating innovative solutions.',
    location: 'Bangalore, Karnataka',
    website: 'https://x.com/sarvagnakadiya',
    joinDate: 'Joined the chaos 3 years ago',
    photoURL:
      'https://pbs.twimg.com/profile_images/1948213553237733376/Gv1W60bF_400x400.jpg',
    coverPhotoURL:
      'https://pbs.twimg.com/profile_banners/1048316313251115008/1760366343/1500x500',
    verified: true,
    followers: ['2.1K'],
    following: ['456'],
    pinnedTweet: null,
    theme: 'light' as const,
    accent: 'blue' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    totalTweets: 0,
    totalPhotos: 0,
    totalLikes: 0
  };

  const loading = false;

  return (
    <UserContextProvider value={{ user, loading }}>
      <MainContainer>
        <MainHeader useActionButton action={back}></MainHeader>
        {children}
      </MainContainer>
    </UserContextProvider>
  );
}
