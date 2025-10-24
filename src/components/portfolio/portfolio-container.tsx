import { usePortfolioData } from '@lib/hooks/usePortfolioData';
import { usePortfolio } from '@lib/context/portfolio-context';
import { ClientOnly } from '@components/common/client-only';
import { PortfolioNavigation } from './portfolio-navigation';
import { PortfolioFeed } from './portfolio-feed';
import { SocialsFeed } from './socials-feed';
import { AboutFeed } from './about-feed';

export function PortfolioContainer(): JSX.Element {
  const { activeTab, setActiveTab } = usePortfolio();
  const { work, projects, education, skills, loading } = usePortfolioData();

  console.log('PortfolioContainer - loading:', loading);
  console.log('PortfolioContainer - activeTab:', activeTab);

  const getTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutFeed />;

      case 'work':
        return (
          <PortfolioFeed
            entries={work}
            loading={loading}
            type='work'
            emptyTitle='No work experience yet'
            emptyDescription='When you add work experience, they will show up here.'
          />
        );

      case 'projects':
        return (
          <PortfolioFeed
            entries={projects}
            loading={loading}
            type='project'
            emptyTitle='No project entries yet'
            emptyDescription='When you add project entries, they will show up here.'
          />
        );

      case 'education':
        return (
          <PortfolioFeed
            entries={education}
            loading={loading}
            type='education'
            emptyTitle='No education entries yet'
            emptyDescription='When you add education entries, they will show up here.'
          />
        );

      case 'skills':
        return (
          <PortfolioFeed
            entries={skills}
            loading={loading}
            type='skill'
            emptyTitle='No skill entries yet'
            emptyDescription='When you add skill entries, they will show up here.'
          />
        );

      case 'socials': {
        const socialLinks = [
          {
            name: 'Twitter',
            url: 'https://x.com/sarvagnakadiya',
            icon: 'ChatBubbleLeftRightIcon',
            color: '#1DA1F2'
          },
          {
            name: 'GitHub',
            url: 'https://github.com/sarvagnakadiya',
            icon: 'CodeBracketIcon',
            color: '#333'
          },
          {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/sarvagnakadiya',
            icon: 'BriefcaseIcon',
            color: '#0077B5'
          },
          {
            name: 'Zora',
            url: 'https://zora.co/@sarvagna',
            icon: 'SparklesIcon',
            color: '#8B5CF6'
          },
          {
            name: 'Portfolio',
            url: 'https://sarvagnakadiya.dev',
            icon: 'GlobeAltIcon',
            color: '#6366F1'
          }
        ];
        return <SocialsFeed socials={socialLinks} />;
      }

      default:
        return null;
    }
  };

  return (
    <ClientOnly fallback={<div className='p-8 text-center'>Loading...</div>}>
      <PortfolioNavigation />
      {getTabContent()}
    </ClientOnly>
  );
}
