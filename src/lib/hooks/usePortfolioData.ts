import { useState, useEffect } from 'react';
import type { PortfolioEntry } from '@components/portfolio/portfolio-entry';

interface PortfolioProfile {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  avatar: string | null;
  cover: string | null;
  stats: {
    experience: string;
    projects: string;
    skills: string;
    education: string;
  };
}

export function usePortfolioData(): {
  profile: PortfolioProfile | null;
  work: PortfolioEntry[] | null;
  education: PortfolioEntry[] | null;
  projects: PortfolioEntry[] | null;
  skills: PortfolioEntry[] | null;
  trendingSkills: unknown[] | null;
  followSuggestions: unknown[] | null;
  loading: boolean;
} {
  const [profile, setProfile] = useState<PortfolioProfile | null>(null);
  const [work, setWork] = useState<PortfolioEntry[] | null>(null);
  const [education, setEducation] = useState<PortfolioEntry[] | null>(null);
  const [projects, setProjects] = useState<PortfolioEntry[] | null>(null);
  const [skills, setSkills] = useState<PortfolioEntry[] | null>(null);
  const [trendingSkills, setTrendingSkills] = useState<unknown[] | null>(null);
  const [followSuggestions, setFollowSuggestions] = useState<unknown[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        // Only fetch data on client side
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        const [
          profileRes,
          workRes,
          educationRes,
          projectsRes,
          skillsRes,
          trendingRes,
          followRes
        ] = await Promise.all([
          fetch('/data/portfolio.json'),
          fetch('/data/experience.json'),
          fetch('/data/education.json'),
          fetch('/data/projects.json'),
          fetch('/data/skills.json'),
          fetch('/data/trending-skills.json'),
          fetch('/data/follow-suggestions.json')
        ]);

        const [
          profileData,
          workData,
          educationData,
          projectsData,
          skillsData,
          trendingData,
          followData
        ] = await Promise.all([
          profileRes.json() as Promise<{ profile: PortfolioProfile }>,
          workRes.json() as Promise<PortfolioEntry[]>,
          educationRes.json() as Promise<PortfolioEntry[]>,
          projectsRes.json() as Promise<PortfolioEntry[]>,
          skillsRes.json() as Promise<PortfolioEntry[]>,
          trendingRes.json() as Promise<unknown[]>,
          followRes.json() as Promise<unknown[]>
        ]);

        setProfile(profileData.profile);
        setWork(workData);
        setEducation(educationData);
        setProjects(projectsData);
        setSkills(skillsData);
        setTrendingSkills(trendingData);
        setFollowSuggestions(followData);

        console.log('Portfolio data loaded:', {
          profile: profileData.profile,
          work: workData,
          education: educationData,
          projects: projectsData,
          skills: skillsData
        });
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  return {
    profile,
    work,
    education,
    projects,
    skills,
    trendingSkills,
    followSuggestions,
    loading
  };
}
