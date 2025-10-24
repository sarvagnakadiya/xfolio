import Link from 'next/link';

export function UserFollowStats(): JSX.Element {
  return (
    <div className='flex gap-4 text-light-secondary dark:text-dark-secondary'>
      <div className='flex items-center gap-1'>
        <span className='font-bold text-light-primary dark:text-dark-primary'>
          -1
        </span>
        <span>Following</span>
      </div>
      <div className='flex items-center gap-1'>
        <Link href='/forasthetics'>
          <a
            className='hover-animation mt-0.5 mb-[3px] flex h-4 items-center gap-1 border-b 
                         border-b-transparent outline-none hover:border-b-light-primary 
                         focus-visible:border-b-light-primary dark:hover:border-b-dark-primary
                         dark:focus-visible:border-b-dark-primary'
          >
            <span className='font-bold text-light-primary dark:text-dark-primary'>
              ∞
            </span>
            <span>Followers</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
