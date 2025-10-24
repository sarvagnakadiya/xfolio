/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import type { PortfolioEntry } from '@components/portfolio/portfolio-entry';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'work' | 'project' | 'education' | 'skill' | 'highlight';
  tab: string;
  relevanceScore: number;
  matchedFields: string[];
  originalData: any;
}

export interface SearchSuggestion {
  id: string;
  title: string;
  subtitle: string;
  type: 'work' | 'project' | 'education' | 'skill' | 'highlight';
  tab: string;
  relevanceScore: number;
}

export class SearchService {
  private static instance: SearchService;
  private allData: any[] = [];
  private isInitialized = false;

  static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const [workRes, educationRes, projectsRes, skillsRes, highlightsRes] =
        await Promise.all([
          fetch('/data/experience.json'),
          fetch('/data/education.json'),
          fetch('/data/projects.json'),
          fetch('/data/skills.json'),
          fetch('/data/highlights.json')
        ]);

      const [
        workData,
        educationData,
        projectsData,
        skillsData,
        highlightsData
      ] = await Promise.all([
        workRes.json() as Promise<any[]>,
        educationRes.json() as Promise<any[]>,
        projectsRes.json() as Promise<any[]>,
        skillsRes.json() as Promise<any[]>,
        highlightsRes.json() as Promise<any[]>
      ]);

      // Combine all data with type information
      this.allData = [
        ...workData.map((item: any) => ({ ...item, dataType: 'work' } as any)),
        ...educationData.map(
          (item: any) =>
            ({
              ...item,
              dataType: 'education'
            } as any)
        ),
        ...projectsData.map(
          (item: any) => ({ ...item, dataType: 'project' } as any)
        ),
        ...skillsData.map(
          (item: any) => ({ ...item, dataType: 'skill' } as any)
        ),
        ...highlightsData.map(
          (item: any) =>
            ({
              ...item,
              dataType: 'highlight'
            } as any)
        )
      ];

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize search service:', error);
    }
  }

  search(query: string, limit: number = 10): SearchResult[] {
    if (!query.trim() || !this.isInitialized) return [];

    const normalizedQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    this.allData.forEach((item) => {
      const relevanceScore = this.calculateRelevance(item, normalizedQuery);

      if (relevanceScore > 0) {
        results.push({
          id: item.id,
          title: item.title || item.subtitle || 'Untitled',
          subtitle: item.subtitle || item.company || item.category || '',
          description: item.description || '',
          type: item.dataType,
          tab: this.getTabName(item.dataType),
          relevanceScore,
          matchedFields: this.getMatchedFields(item, normalizedQuery),
          originalData: item
        });
      }
    });

    // Sort by relevance score (highest first) and return limited results
    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  getSuggestions(query: string, limit: number = 5): SearchSuggestion[] {
    const searchResults = this.search(query, limit);

    return searchResults.map((result) => ({
      id: result.id,
      title: result.title,
      subtitle: result.subtitle,
      type: result.type,
      tab: result.tab,
      relevanceScore: result.relevanceScore
    }));
  }

  private calculateRelevance(item: any, query: string): number {
    let score = 0;
    const fields = [
      { field: 'title', weight: 10 },
      { field: 'subtitle', weight: 8 },
      { field: 'description', weight: 6 },
      { field: 'technologies', weight: 7 },
      { field: 'skills', weight: 7 },
      { field: 'company', weight: 5 },
      { field: 'category', weight: 5 },
      { field: 'location', weight: 3 }
    ];

    fields.forEach(({ field, weight }) => {
      const value = item[field];
      if (!value) return;

      if (Array.isArray(value)) {
        value.forEach((val: string) => {
          if (val.toLowerCase().includes(query)) {
            score += weight;
          }
        });
      } else if (typeof value === 'string') {
        if (value.toLowerCase().includes(query)) {
          score += weight;
        }
      }
    });

    return score;
  }

  private getMatchedFields(item: any, query: string): string[] {
    const matchedFields: string[] = [];
    const fields = [
      'title',
      'subtitle',
      'description',
      'technologies',
      'skills',
      'company',
      'category',
      'location'
    ];

    fields.forEach((field) => {
      const value = item[field];
      if (!value) return;

      if (Array.isArray(value)) {
        value.forEach((val: string) => {
          if (val.toLowerCase().includes(query)) {
            matchedFields.push(field);
          }
        });
      } else if (typeof value === 'string') {
        if (value.toLowerCase().includes(query)) {
          matchedFields.push(field);
        }
      }
    });

    return Array.from(new Set(matchedFields));
  }

  private getTabName(dataType: string): string {
    switch (dataType) {
      case 'work':
        return 'work';
      case 'project':
        return 'projects';
      case 'education':
        return 'education';
      case 'skill':
        return 'skills';
      case 'highlight':
        return 'highlights';
      default:
        return 'work';
    }
  }
}
