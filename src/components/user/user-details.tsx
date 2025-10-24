import { formatDate } from '@lib/date';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { UserName } from './user-name';
// Removed user following import
import { UserFollowStats } from './user-follow-stats';
import type { IconName } from '@components/ui/hero-icon';
import type { User } from '@lib/types/user';

type UserDetailsProps = Pick<
  User,
  | 'id'
  | 'bio'
  | 'name'
  | 'website'
  | 'username'
  | 'location'
  | 'verified'
  | 'createdAt'
  | 'following'
  | 'followers'
>;

type DetailIcon = [string | null, IconName];

export function UserDetails({
  id,
  bio,
  name,
  website,
  username,
  location,
  verified,
  createdAt,
  following,
  followers
}: UserDetailsProps): JSX.Element {
  const detailIcons: Readonly<DetailIcon[]> = [
    [location, 'MapPinIcon'],
    [website, 'LinkIcon'],
    ['Joined the chaos 3 years ago', 'CalendarDaysIcon']
  ];

  return (
    <>
      <div>
        <UserName
          className='-mb-1 text-lg font-bold xs:text-xl'
          name={name}
          iconClassName='w-4 h-4 xs:w-5 xs:h-5'
          verified={verified}
        />
        <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
          <p className='text-sm xs:text-base'>@{username}</p>
          {/* Removed user following component */}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {bio && <p className='whitespace-pre-line break-words'>{bio}</p>}
        <div className='flex flex-wrap gap-x-3 gap-y-1 text-light-secondary dark:text-dark-secondary'>
          {detailIcons.map(
            ([detail, icon], index) =>
              detail && (
                <div className='flex items-center gap-1' key={icon}>
                  <i>
                    <HeroIcon className='h-5 w-5' iconName={icon} />
                  </i>
                  {index === 1 ? (
                    <a
                      className='custom-underline text-main-accent'
                      href={`${detail}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {detail}
                    </a>
                  ) : (
                    <p>{detail}</p>
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <UserFollowStats />
    </>
  );
}
