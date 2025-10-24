import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearch } from '@lib/context/search-context';
import { SearchResults } from '@components/search/search-results';
import { SEO } from '@components/common/seo';
import { PortfolioMainLayout } from '@components/layout/portfolio-main-layout';
import type { ReactElement } from 'react';

export default function SearchPage(): JSX.Element {
  const router = useRouter();
  const { query } = router.query;
  const { setQuery } = useSearch();

  useEffect(() => {
    if (typeof query === 'string') {
      setQuery(query);
    }
  }, [query, setQuery]);

  return (
    <>
      <SEO title={`Search: ${String(query || '')}`} />
      <main className='main-container'>
        <div className='inner:px-4 inner:py-3'>
          <SearchResults />
        </div>
      </main>
    </>
  );
}

SearchPage.getLayout = (page: ReactElement): ReactElement => (
  <PortfolioMainLayout>{page}</PortfolioMainLayout>
);
