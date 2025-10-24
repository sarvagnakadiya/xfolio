import { useSearch } from '@lib/context/search-context';
import { usePortfolio } from '@lib/context/portfolio-context';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import type { SearchResult } from '@lib/search/search-service';
import type { IconName } from '@components/ui/hero-icon';
import cn from 'clsx';

export function SearchResults(): JSX.Element {
  const { results, isSearching, query, scrollToItem } = useSearch();
  const { setActiveTab } = usePortfolio();

  if (isSearching) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Loading className='mt-5' />
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <HeroIcon
          className='mb-4 h-12 w-12 text-light-secondary dark:text-dark-secondary'
          iconName='MagnifyingGlassIcon'
        />
        <h3 className='mb-2 text-xl font-bold text-light-primary dark:text-dark-primary'>
          Search Your Portfolio
        </h3>
        <p className='text-center text-light-secondary dark:text-dark-secondary'>
          Enter a term to search through your work, projects, education, and
          skills
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <HeroIcon
          className='mb-4 h-12 w-12 text-light-secondary dark:text-dark-secondary'
          iconName='MagnifyingGlassIcon'
        />
        <h3 className='mb-2 text-xl font-bold text-light-primary dark:text-dark-primary'>
          No results found
        </h3>
        <p className='text-center text-light-secondary dark:text-dark-secondary'>
          Try searching for different keywords or check your spelling
        </p>
      </div>
    );
  }

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'work':
        return 'BriefcaseIcon';
      case 'project':
        return 'CodeBracketIcon';
      case 'education':
        return 'AcademicCapIcon';
      case 'skill':
        return 'CogIcon';
      case 'highlight':
        return 'StarIcon';
      default:
        return 'DocumentTextIcon';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'work':
        return 'text-blue-500';
      case 'project':
        return 'text-green-500';
      case 'education':
        return 'text-purple-500';
      case 'skill':
        return 'text-orange-500';
      case 'highlight':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleResultClick = (result: SearchResult): void => {
    setActiveTab(result.tab);
    // Scroll to the specific item after tab switch
    scrollToItem(result.id, result.type);
  };

  return (
    <div className='space-y-4'>
      <div className='mb-6'>
        <h2 className='mb-2 text-2xl font-bold text-light-primary dark:text-dark-primary'>
          Search Results for &quot;{query}&quot;
        </h2>
        <p className='text-light-secondary dark:text-dark-secondary'>
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className='space-y-3'>
        {results.map((result) => (
          <button
            key={result.id}
            className='w-full text-left'
            onClick={() => handleResultClick(result)}
          >
            <div className='hover-animation rounded-lg border border-light-border bg-main-background p-4 transition-colors hover:bg-light-primary/5 dark:border-dark-border dark:hover:bg-dark-primary/5'>
              <div className='flex items-start gap-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-main-accent/10'>
                  <HeroIcon
                    className={cn('h-5 w-5', getTypeColor(result.type))}
                    iconName={getTypeIcon(result.type) as IconName}
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='mb-1 flex items-center gap-2'>
                    <h3 className='truncate font-semibold text-light-primary dark:text-dark-primary'>
                      {result.title}
                    </h3>
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs font-medium',
                        'bg-main-accent/10 text-main-accent'
                      )}
                    >
                      {result.tab}
                    </span>
                  </div>
                  <p className='mb-2 truncate text-sm text-light-secondary dark:text-dark-secondary'>
                    {result.subtitle}
                  </p>
                  <p className='line-clamp-2 text-sm text-light-secondary dark:text-dark-secondary'>
                    {result.description}
                  </p>
                  {result.matchedFields.length > 0 && (
                    <div className='mt-2 flex flex-wrap gap-1'>
                      {result.matchedFields.map((field) => (
                        <span
                          key={field}
                          className='rounded-full bg-main-accent/20 px-2 py-1 text-xs text-main-accent'
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <HeroIcon
                  className='h-4 w-4 flex-shrink-0 text-light-secondary dark:text-dark-secondary'
                  iconName='ArrowTopRightOnSquareIcon'
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
