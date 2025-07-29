/**
 * Data type definitions for the Vjera Hub. These interfaces mirror those
 * from the original project but have been simplified. Feel free to extend
 * them as your application grows.
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  status: 'draft' | 'review' | 'scheduled' | 'published';
  type: 'vijest' | 'analiza' | 'kolumna' | 'intervju' | 'duhovnost';
  denomination: 'katoličko' | 'pravoslavno' | 'protestantsko' | 'ekumensko';
  authorId: string;
  categoryId: string;
  tags: string[];
  sourceName?: string;
  sourceUrl?: string;
  publishedAt: string;
  updatedAt: string;
  heroImage: {
    url: string;
    alt: string;
    credit?: string;
    license?: string;
  };
  featured: boolean;
  readingTime: number;
  views: number;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatarUrl: string;
  social: {
    twitter?: string;
    website?: string;
  };
  role: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface EventLocation {
  city: string;
  country: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: EventLocation;
  denomination: Category['slug'];
  startsAt: string;
  endsAt: string;
  heroImage: {
    url: string;
    alt: string;
  };
}