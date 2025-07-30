import React from "react";
import { Link } from "react-router-dom";

// Import our card component and mock data. These live in the same repo so
// relative imports work even though the real project uses path aliases.
import ArticleCard from "../components/ArticleCard";
import type { Article, Event, Category, Author } from "../lib/types";
import { fetchArticles, fetchEvents, fetchCategories, fetchAuthors } from "../lib/api";

/**
 * The home page of the Vjerski Portal. In the original project this file
 * contains a large amount of markup to lay out a hero section, feature
 * articles, latest news, analysis, spirituality content, most read and
 * upcoming events as well as a list of categories. To keep this example
 * lightweight we retain the basic data‑driven structure while simplifying
 * the markup. Feel free to expand on the layout using Tailwind classes or
 * your own CSS.
 */
const HomePage: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [authors, setAuthors] = React.useState<Author[]>([]);

  React.useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
    fetchEvents().then(setEvents).catch(console.error);
    fetchCategories().then(setCategories).catch(console.error);
    fetchAuthors().then(setAuthors).catch(console.error);
  }, []);

  const featuredArticles = articles.filter((a) => a.featured);
  const latestArticles = articles.slice(0, 3);
  const analysisArticles = articles.filter((a) => a.type === "analiza");
  const spiritualArticles = articles.filter((a) => a.type === "duhovnost");
  const mostReadArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero / Intro section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <h1 className="text-4xl font-bold mb-2">Vjerski Portal</h1>
        <p className="text-lg">Vjerodostojan izvor vijesti, analiza i duhovnih sadržaja za kršćansku zajednicu.</p>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="px-4">
          <h2 className="text-2xl font-semibold mb-4">Istaknuti članci</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                author={authors.find((a) => a.id === article.authorId)}
                category={categories.find((c) => c.id === article.categoryId)}
                size="large"
              />
            ))}
          </div>
        </section>
      )}

      {/* Latest News */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Najnovije vijesti</h2>
          <Link to="/vijesti" className="text-blue-600 hover:underline">
            Sve vijesti
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              author={authors.find((a) => a.id === article.authorId)}
              category={categories.find((c) => c.id === article.categoryId)}
              size="medium"
            />
          ))}
        </div>
      </section>

      {/* Analysis & Spirituality */}
      <section className="px-4 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Analize</h2>
            <Link to="/analize" className="text-blue-600 hover:underline">
              Sve analize
            </Link>
          </div>
          {analysisArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              author={authors.find((a) => a.id === article.authorId)}
              category={categories.find((c) => c.id === article.categoryId)}
              size="small"
            />
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Duhovnost</h2>
            <Link to="/duhovnost" className="text-blue-600 hover:underline">
              Više duhovnih sadržaja
            </Link>
          </div>
          {spiritualArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              author={authors.find((a) => a.id === article.authorId)}
              category={categories.find((c) => c.id === article.categoryId)}
              size="small"
            />
          ))}
        </div>
      </section>

      {/* Most read articles */}
      <section className="px-4">
        <h2 className="text-2xl font-semibold mb-4">Najčitanije</h2>
        <ol className="list-decimal list-inside space-y-2">
          {mostReadArticles.map((article, index) => (
            <li key={article.id}>
              <Link to={`/clanak/${article.slug}`} className="text-blue-600 hover:underline">
                {article.title}
              </Link>
              <span className="text-sm text-gray-600 ml-2">({article.views} prikaza)</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section className="px-4">
          <h2 className="text-2xl font-semibold mb-4">Nadolazeći događaji</h2>
          <ul className="space-y-2">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <strong>{event.title}</strong>
                  <p className="text-sm text-gray-600">
                    {event.location.city}, {event.location.country}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{new Date(event.startsAt).toLocaleDateString('hr-HR')}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Categories list */}
      <section className="px-4">
        <h2 className="text-2xl font-semibold mb-4">Rubrike</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/tema/${category.slug}`}
              className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;