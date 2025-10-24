import { useSearch } from '@lib/context/search-context';
import { usePortfolio } from '@lib/context/portfolio-context';
import { HeroIcon } from '@components/ui/hero-icon';
import type { SearchSuggestion } from '@lib/search/search-service';
import type { IconName } from '@components/ui/hero-icon';
import cn from 'clsx';

export function SearchSuggestions(): JSX.Element {
  const {
    suggestions,
    showSuggestions,
    selectedIndex,
    setSelectedIndex,
    setShowSuggestions,
    scrollToItem
  } = useSearch();
  const { setActiveTab } = usePortfolio();

  if (!showSuggestions || suggestions.length === 0) {
    return <></>;
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion): void => {
    setActiveTab(suggestion.tab);
    setShowSuggestions(false);
    // Scroll to the specific item after tab switch
    scrollToItem(suggestion.id, suggestion.type);
  };

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

  return (
    <div className='absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-lg border border-light-border bg-main-background shadow-lg dark:border-dark-border'>
      <div className='p-2'>
        <div className='mb-2 text-xs font-semibold text-light-secondary dark:text-dark-secondary'>
          Search Results
        </div>
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.id}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors',
              'hover:bg-light-primary/10 dark:hover:bg-dark-primary/10',
              selectedIndex === index &&
                'bg-light-primary/10 dark:bg-dark-primary/10'
            )}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-main-accent/10'>
              <HeroIcon
                className={cn('h-4 w-4', getTypeColor(suggestion.type))}
                iconName={getTypeIcon(suggestion.type) as IconName}
              />
            </div>
            <div className='min-w-0 flex-1'>
              <div className='truncate font-medium text-light-primary dark:text-dark-primary'>
                {suggestion.title}
              </div>
              <div className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
                {suggestion.subtitle}
              </div>
              <div className='text-xs text-light-secondary dark:text-dark-secondary'>
                {suggestion.tab.charAt(0).toUpperCase() +
                  suggestion.tab.slice(1)}
              </div>
            </div>
            <HeroIcon
              className='h-4 w-4 text-light-secondary dark:text-dark-secondary'
              iconName='ArrowTopRightOnSquareIcon'
            />
          </button>
        ))}
      </div>
    </div>
  );
}
