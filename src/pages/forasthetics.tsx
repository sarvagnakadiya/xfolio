import { SEO } from '@components/common/seo';
import { HeroIcon } from '@components/ui/hero-icon';

export default function ForAesthetics(): JSX.Element {
  return (
    <>
      <SEO title='For Aesthetics' />
      <main className='main-container'>
        <div className='inner:px-4 inner:py-3'>
          <div className='flex min-h-[60vh] flex-col items-center justify-center text-center'>
            <div className='mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-main-accent/10'>
              <HeroIcon
                className='h-12 w-12 text-main-accent'
                iconName='SparklesIcon'
              />
            </div>

            <h1 className='mb-4 text-4xl font-bold text-light-primary dark:text-dark-primary'>
              For Aesthetics
            </h1>

            <p className='mb-8 max-w-md text-lg text-light-secondary dark:text-dark-secondary'>
              lol, its there just for the aesthetic purpose
            </p>

            <div className='rounded-lg bg-main-accent/5 p-6 text-center'>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                This page exists purely for visual consistency and placeholder
                purposes.
                <br />
                No actual content here, just keeping things looking clean! ✨
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
