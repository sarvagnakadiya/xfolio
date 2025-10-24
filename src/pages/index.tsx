import { PortfolioMainLayout } from '@components/layout/portfolio-main-layout';
import { UserLayout } from '@components/layout/common-layout';
import { SEO } from '@components/common/seo';
import { UserDataLayout } from '@components/layout/user-data-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
import { PortfolioContainer } from '@components/portfolio/portfolio-container';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
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
