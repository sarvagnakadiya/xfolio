import cn from 'clsx';
import type { ReactNode } from 'react';

type MainContainerProps = {
  children: ReactNode;
  className?: string;
};

export function MainContainer({
  children,
  className
}: MainContainerProps): JSX.Element {
  return (
    <main
      className={cn(
        `hover-animation relative flex min-h-screen w-full max-w-xl flex-col overflow-hidden
         border-x-0 border-light-border pb-20 dark:border-dark-border xs:border-x xs:pb-96`,
        className
      )}
    >
      {children}

      {/* Footer Text */}
      <div className='pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden'>
        <p
          className='blaka-hollow-regular text-center text-[4rem] font-bold leading-none tracking-widest text-[#1DA1F2] opacity-30 xs:text-[5rem] sm:text-[6rem] lg:text-[7rem]'
          style={{
            transform: 'translateY(25%)'
          }}
        >
          SARVAGNA
        </p>
      </div>
    </main>
  );
}
