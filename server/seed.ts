import { PrismaClient } from '@prisma/client';
import { authors, categories, articles, events } from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
  // Seed authors
  for (const a of authors) {
    await prisma.author.create({
      data: {
        name: a.name,
        slug: a.slug,
        bio: a.bio,
        avatarUrl: a.avatarUrl,
        twitter: a.social.twitter ?? null,
        website: a.social.website ?? null,
        role: a.role,
      },
    });
  }

  // Seed categories
  for (const c of categories) {
    await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        color: c.color,
      },
    });
  }

  // Seed articles
  for (const art of articles) {
    await prisma.article.create({
      data: {
        slug: art.slug,
        title: art.title,
        summary: art.summary,
        content: art.content,
        status: art.status as any,
        type: art.type as any,
        denomination: art.denomination as any,
        authorId: parseInt(art.authorId, 10),
        categoryId: parseInt(art.categoryId, 10),
        tags: art.tags,
        sourceName: art.sourceName ?? null,
        sourceUrl: art.sourceUrl ?? null,
        publishedAt: new Date(art.publishedAt),
        updatedAt: new Date(art.updatedAt),
        heroImage: art.heroImage as any,
        featured: art.featured,
        readingTime: art.readingTime,
        views: art.views,
      },
    });
  }

  // Seed events
  for (const ev of events) {
    await prisma.event.create({
      data: {
        title: ev.title,
        slug: ev.slug,
        description: ev.description,
        city: ev.location.city,
        country: ev.location.country,
        denomination: ev.denomination as any,
        startsAt: new Date(ev.startsAt),
        endsAt: new Date(ev.endsAt),
        heroImage: ev.heroImage as any,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
