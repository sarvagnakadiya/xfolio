import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PortfolioMainLayout } from '@components/layout/portfolio-main-layout';
import { UserLayout } from '@components/layout/common-layout';
import { SEO } from '@components/common/seo';
import { UserDataLayout } from '@components/layout/user-data-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
import { PortfolioContainer } from '@components/portfolio/portfolio-container';
import { usePortfolio } from '@lib/context/portfolio-context';
import { useSearch } from '@lib/context/search-context';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
  const router = useRouter();
  const { setActiveTab } = usePortfolio();
  const { scrollToItem } = useSearch();

  useEffect(() => {
    const { post, tab } = router.query;

    console.log('URL parameters:', { post, tab });

    if (tab && typeof tab === 'string') {
      console.log('Setting active tab to:', tab);
      setActiveTab(tab);
    }

    if (post && typeof post === 'string') {
      console.log('Scrolling to post:', post);
      // Wait for the tab to be set and content to render, then scroll to the item
      setTimeout(() => {
        // Use the tab parameter to determine the correct type for scrolling
        const scrollType = tab && typeof tab === 'string' ? tab : 'about';
        scrollToItem(post, scrollType);
      }, 500);
    }
  }, [router.query, setActiveTab, scrollToItem]);

  return (
    <section>
      <SEO title='Sarvagna Kadiya - Portfolio' />
      <PortfolioContainer />
    </section>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <PortfolioMainLayout>
    <UserLayout>
      <UserDataLayout>
        <UserHomeLayout>{page}</UserHomeLayout>
      </UserDataLayout>
    </UserLayout>
  </PortfolioMainLayout>
);
