import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import {
  SearchService,
  type SearchResult,
  type SearchSuggestion
} from '../search/search-service';

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  suggestions: SearchSuggestion[];
  isSearching: boolean;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  clearSearch: () => void;
  scrollToItem: (itemId: string, itemType: string) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

type SearchContextProviderProps = {
  children: ReactNode;
};

export function SearchContextProvider({
  children
}: SearchContextProviderProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchService = SearchService.getInstance();

  useEffect(() => {
    // Initialize search service
    void searchService.initialize();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce search
    const timeoutId = setTimeout(() => {
      const searchResults = searchService.search(query);
      const searchSuggestions = searchService.getSuggestions(query);

      setResults(searchResults);
      setSuggestions(searchSuggestions);
      setShowSuggestions(true);
      setIsSearching(false);
      setSelectedIndex(0);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const clearSearch = (): void => {
    setQuery('');
    setResults([]);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(0);
  };

  const scrollToItem = (itemId: string, itemType: string): void => {
    console.log('scrollToItem called with:', { itemId, itemType });

    // Wait for the tab to switch and content to render
    setTimeout(() => {
      // Determine the correct element ID based on the item type
      let elementId: string;

      if (itemType === 'skills') {
        // For skills, the ID format is portfolio-item-skill-{id}
        elementId = `portfolio-item-skill-${itemId}`;
      } else if (itemType === 'about') {
        // For about, the ID format is portfolio-item-about-{id}
        elementId = `portfolio-item-about-${itemId}`;
      } else {
        // For other types (work, projects, education), the ID format is portfolio-item-{id}
        elementId = `portfolio-item-${itemId}`;
      }

      console.log('Looking for element with ID:', elementId);

      const element = document.getElementById(elementId);
      console.log('Element found:', element);

      if (element) {
        console.log('Element found, scrolling to it');

        // Remove any existing highlight
        document.querySelectorAll('.search-highlight').forEach((el) => {
          el.classList.remove('search-highlight');
        });

        // Add highlight effect
        element.classList.add('search-highlight');

        // Scroll to the element
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Remove highlight after 3 seconds
        setTimeout(() => {
          element.classList.remove('search-highlight');
        }, 3000);
      } else {
        console.log('Element not found with ID:', elementId);
        // Let's also check what elements are available
        const allPortfolioItems = document.querySelectorAll(
          '[id^="portfolio-item-"]'
        );
        console.log(
          'Available portfolio items:',
          Array.from(allPortfolioItems).map((el) => el.id)
        );
      }
    }, 100);
  };

  const value: SearchContextType = {
    query,
    setQuery,
    results,
    suggestions,
    isSearching,
    showSuggestions,
    setShowSuggestions,
    selectedIndex,
    setSelectedIndex,
    clearSearch,
    scrollToItem
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);

  if (!context)
    throw new Error('useSearch must be used within an SearchContextProvider');

  return context;
}
