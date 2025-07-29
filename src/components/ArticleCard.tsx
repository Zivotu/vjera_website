import React from "react";
import { Link } from "react-router-dom";
import type { Article, Author, Category } from "../lib/types";
import { authors, categories } from "../lib/mockData";

export interface ArticleCardProps {
  /** The article record to display */
  article: Article;
  /** Controls the vertical height of the image container */
  size?: "small" | "medium" | "large";
  /** Whether to show the hero image at the top of the card */
  showImage?: boolean;
}

/**
 * Displays a blog or news article summary. The real project has a highly
 * styled component with badges, gradients and responsive sizing. Here we
 * implement a pared down version that still surfaces the important
 * information such as title, summary, category and metadata.
 */
const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  size = "medium",
  showImage = true,
}) => {
  const author: Author | undefined = authors.find((a) => a.id === article.authorId);
  const category: Category | undefined = categories.find((c) => c.id === article.categoryId);

  const sizeClasses: Record<string, string> = {
    small: "h-32",
    medium: "h-48",
    large: "h-64",
  };

  return (
    <article className="border rounded-md overflow-hidden shadow-sm bg-white">
      {showImage && (
        <div className={`overflow-hidden ${sizeClasses[size]}`}>
          <img
            src={article.heroImage.url}
            alt={article.heroImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 space-y-2">
        {category && (
          <span className="text-xs uppercase tracking-wide text-gray-500">
            {category.name}
          </span>
        )}
        <Link
          to={`/clanak/${article.slug}`}
          className="block font-semibold text-lg leading-tight hover:underline"
        >
          {article.title}
        </Link>
        <p className="text-sm text-gray-700 line-clamp-3">{article.summary}</p>
        <div className="text-xs text-gray-500 flex flex-wrap justify-between items-center gap-2">
          {author && <span>{author.name}</span>}
          <span>{article.readingTime} min čitanja</span>
          <span>{article.views} prikaza</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;