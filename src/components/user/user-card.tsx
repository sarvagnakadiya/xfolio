import { UserAvatar } from '@components/user/user-avatar';
import { UserName } from './user-name';
import { UserUsername } from './user-username';
import { Button } from '@components/ui/button';
import type { User } from '@lib/types/user';

type UserCardProps = User & {
  modal?: boolean;
  follow?: boolean;
  url?: string;
};

export function UserCard(user: UserCardProps): JSX.Element {
  const { bio, name, follow, username, verified, photoURL, url } = user;

  const handleVisit = (): void => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className='accent-tab hover-animation grid grid-cols-[auto,1fr,auto] gap-3 px-4 py-2 hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'>
      <UserAvatar src={photoURL} alt={name} username={username} />
      <div className='flex flex-col gap-1 truncate xs:overflow-visible'>
        <div className='flex items-center justify-between gap-2 truncate xs:overflow-visible'>
          <div className='flex flex-col justify-center truncate xs:overflow-visible xs:whitespace-normal'>
            <UserName
              className='-mb-1'
              name={name}
              username={username}
              verified={verified}
            />
            <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
              <UserUsername username={username} />
            </div>
          </div>
        </div>
        {follow && bio && <p className='whitespace-normal'>{bio}</p>}
      </div>
      <div className='flex items-center'>
        <Button
          className='rounded-full bg-black px-4 py-1 text-white hover:bg-gray-800'
          onClick={handleVisit}
        >
          Visit
        </Button>
      </div>
    </div>
  );
}
