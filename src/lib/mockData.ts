import type { Article, Author, Category, Event } from './types';

/**
 * Mock data used to populate the pages and components. The original
 * repository contains a rich set of articles, authors, categories and
 * events. Here we define a minimal dataset to demonstrate the data
 * structures and allow the home page and article cards to function.
 */

export const authors: Author[] = [
  {
    id: '1',
    name: 'vlč. Marko Kovač',
    slug: 'vlc-marko-kovac',
    bio: 'Župnik u Zagrebu i predavač na Katoličkom bogoslovnom fakultetu.',
    avatarUrl: '/images/demo/author1.jpg',
    social: { website: 'https://example.com' },
    role: 'Župnik',
  },
  {
    id: '2',
    name: 's. Ana Marija Horvat',
    slug: 's-ana-marija-horvat',
    bio: 'Redovnica i autorica duhovnih tekstova.',
    avatarUrl: '/images/demo/author2.jpg',
    social: { twitter: '@anamhorvat' },
    role: 'Redovnica',
  },
];

export const categories: Category[] = [
  { id: '1', name: 'Vijesti', slug: 'vijesti', color: '#2563EB' },
  { id: '2', name: 'Analize', slug: 'analize', color: '#059669' },
  { id: '3', name: 'Duhovnost', slug: 'duhovnost', color: '#D97706' },
];

export const articles: Article[] = [
  {
    id: '1',
    slug: 'naslov-clanka-1',
    title: 'Prvi istaknuti članak',
    summary: 'Ovo je kratki sažetak prvog članka koji donosi pregled najvažnijih događaja.',
    content: 'Detaljan sadržaj članka...',
    status: 'published',
    type: 'vijest',
    denomination: 'katoličko',
    authorId: '1',
    categoryId: '1',
    tags: ['crkva', 'društvo'],
    sourceName: undefined,
    sourceUrl: undefined,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    heroImage: {
      url: '/images/demo/article1.jpg',
      alt: 'Ilustrativna slika članka 1',
    },
    featured: true,
    readingTime: 4,
    views: 128,
  },
  {
    id: '2',
    slug: 'naslov-clanka-2',
    title: 'Analiza suvremenih tema',
    summary: 'Analiziramo aktualne društvene i religijske teme u kontekstu vjere.',
    content: 'Detaljan sadržaj analize...',
    status: 'published',
    type: 'analiza',
    denomination: 'katoličko',
    authorId: '2',
    categoryId: '2',
    tags: ['analiza', 'teologija'],
    sourceName: undefined,
    sourceUrl: undefined,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    heroImage: {
      url: '/images/demo/article2.jpg',
      alt: 'Ilustrativna slika članka 2',
    },
    featured: false,
    readingTime: 6,
    views: 64,
  },
  {
    id: '3',
    slug: 'duhovnost-uvod',
    title: 'Put duhovnosti',
    summary: 'Kratki uvod u prakticiranje svakodnevne duhovnosti.',
    content: 'Detaljan sadržaj o duhovnosti...',
    status: 'published',
    type: 'duhovnost',
    denomination: 'katoličko',
    authorId: '2',
    categoryId: '3',
    tags: ['duhovnost', 'molitva'],
    sourceName: undefined,
    sourceUrl: undefined,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    heroImage: {
      url: '/images/demo/article3.jpg',
      alt: 'Ilustrativna slika članka 3',
    },
    featured: false,
    readingTime: 5,
    views: 80,
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Misa u katedrali',
    slug: 'misa-u-katedrali',
    description: 'Svečana misa u zagrebačkoj katedrali',
    location: { city: 'Zagreb', country: 'Hrvatska' },
    denomination: 'katoličko',
    startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    heroImage: { url: '/images/demo/event1.jpg', alt: 'Slika događaja 1' },
  },
  {
    id: '2',
    title: 'Tribina o teologiji',
    slug: 'tribina-o-teologiji',
    description: 'Javna tribina o suvremenoj teologiji',
    location: { city: 'Split', country: 'Hrvatska' },
    denomination: 'katoličko',
    startsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    heroImage: { url: '/images/demo/event2.jpg', alt: 'Slika događaja 2' },
  },
];