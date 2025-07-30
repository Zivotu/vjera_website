import type { Article, Event, Category, Author } from './types';

const API_BASE = 'http://localhost:4000';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }
  return res.json();
}

export const fetchArticles = () => get<Article[]>(`/articles`);
export const fetchEvents = () => get<Event[]>(`/events`);
export const fetchCategories = () => get<Category[]>(`/categories`);
export const fetchAuthors = () => get<Author[]>(`/authors`);
