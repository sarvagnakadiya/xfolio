import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { useSearch } from '@lib/context/search-context';
import { usePortfolio } from '@lib/context/portfolio-context';
import { SearchSuggestions } from '@components/search/search-suggestions';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';

export function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    showSuggestions,
    setShowSuggestions,
    selectedIndex,
    setSelectedIndex,
    suggestions,
    clearSearch,
    scrollToItem
  } = useSearch();
  const { setActiveTab } = usePortfolio();

  // Sync local input with search context
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(value);
    setQuery(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue) void push(`/search?q=${inputValue}`);
  };

  const clearInputValue = (focus?: boolean) => (): void => {
    if (focus) inputRef.current?.focus();
    else inputRef.current?.blur();

    setInputValue('');
    clearSearch();
  };

  const handleEscape = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Escape') {
      clearInputValue()();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((selectedIndex + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(
          (selectedIndex - 1 + suggestions.length) % suggestions.length
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          // Handle suggestion selection
          const suggestion = suggestions[selectedIndex];
          setActiveTab(suggestion.tab);
          setShowSuggestions(false);
          // Scroll to the specific item after tab switch
          scrollToItem(suggestion.id, suggestion.type);
        }
        break;
    }
  };

  return (
    <div className='relative'>
      <form
        className='hover-animation sticky top-0 z-10 -my-2 bg-main-background py-2'
        onSubmit={handleSubmit}
      >
        <label
          className='group flex items-center justify-between gap-4 rounded-full
                     bg-main-search-background px-4 py-2 transition focus-within:bg-main-background
                     focus-within:ring-2 focus-within:ring-main-accent'
        >
          <i>
            <HeroIcon
              className='h-5 w-5 text-light-secondary transition-colors 
                         group-focus-within:text-main-accent dark:text-dark-secondary'
              iconName='MagnifyingGlassIcon'
            />
          </i>
          <input
            className='peer flex-1 bg-transparent outline-none 
                       placeholder:text-light-secondary dark:placeholder:text-dark-secondary'
            type='text'
            placeholder='Search Portfolio...'
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onKeyUp={handleEscape}
            onKeyDown={handleKeyDown}
          />
          <Button
            className={cn(
              'accent-tab scale-50 bg-main-accent p-1 opacity-0 transition hover:brightness-90 disabled:opacity-0',
              inputValue &&
                'focus:scale-100 focus:opacity-100 peer-focus:scale-100 peer-focus:opacity-100'
            )}
            onClick={clearInputValue(true)}
            disabled={!inputValue}
          >
            <HeroIcon className='h-3 w-3 stroke-white' iconName='XMarkIcon' />
          </Button>
        </label>
      </form>
      <SearchSuggestions />
    </div>
  );
}
