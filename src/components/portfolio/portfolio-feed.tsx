import { AnimatePresence } from 'framer-motion';
import { Loading } from '@components/ui/loading';
import { StatsEmpty } from '@components/tweet/stats-empty';
import {
  PortfolioEntry,
  type PortfolioEntry as PortfolioEntryType
} from './portfolio-entry';
import {
  SkillsEntry,
  type SkillsEntry as SkillsEntryType
} from './skills-entry';

interface PortfolioFeedProps {
  entries: PortfolioEntryType[] | SkillsEntryType[] | null;
  loading: boolean;
  type: 'work' | 'education' | 'project' | 'skill' | 'about';
  emptyTitle?: string;
  emptyDescription?: string;
}

export function PortfolioFeed({
  entries,
  loading,
  type,
  emptyTitle,
  emptyDescription
}: PortfolioFeedProps): JSX.Element {
  if (loading) return <Loading className='mt-5' />;

  if (!entries || entries.length === 0) {
    return (
      <StatsEmpty
        title={emptyTitle ?? `No ${type} entries yet`}
        description={
          emptyDescription ??
          `When you add ${type} entries, they will show up here.`
        }
      />
    );
  }

  return (
    <section>
      <AnimatePresence mode='popLayout'>
        {entries.map((entry) => {
          if (type === 'skill') {
            return (
              <SkillsEntry
                key={(entry as SkillsEntryType).id}
                entry={entry as SkillsEntryType}
              />
            );
          }
          return (
            <PortfolioEntry
              key={(entry as PortfolioEntryType).id}
              entry={entry as PortfolioEntryType}
              type={type}
            />
          );
        })}
      </AnimatePresence>
    </section>
  );
}
