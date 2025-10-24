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
         border-x-0 border-light-border pb-96 dark:border-dark-border xs:border-x`,
        className
      )}
    >
      {children}

      {/* Footer Text */}
      <div className='pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden'>
        <p
          className='blaka-hollow-regular text-center text-[7rem] font-bold leading-none tracking-widest text-[#1DA1F2] opacity-30'
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
