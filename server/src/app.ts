import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, ArticleStatus, ArticleType, Denomination } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import { gql } from 'apollo-server-core';
import GraphQLJSON from 'graphql-type-json';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// JWT secret from env
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Helper to generate JWT token
function generateToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

// Ensure default admin user exists
async function ensureAdmin() {
  const email = 'amir@yahoo.com';
  const password = '123456';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, passwordHash } });
    console.log(`Created default admin user: ${email}`);
  }
}

// Authentication middleware
function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization;
  if (header) {
    try {
      const token = header.split(' ')[1];
      const payload = jwt.verify(token, JWT_SECRET) as any;
      (req as any).userId = payload.userId;
    } catch {}
  }
  next();
}

app.use(authMiddleware);

// --- REST endpoints ---

// Auth: register
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { email, passwordHash } });
    res.json({ token: generateToken(user.id) });
  } catch {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Auth: login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ token: generateToken(user.id) });
});

// Authors CRUD
app.get('/authors', async (_req, res) => {
  res.json(await prisma.author.findMany());
});
app.post('/authors', async (req, res) => {
  res.json(await prisma.author.create({ data: req.body }));
});
app.get('/authors/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.author.findUnique({ where: { id } }));
});
app.put('/authors/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.author.update({ where: { id }, data: req.body }));
});
app.delete('/authors/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.author.delete({ where: { id } }));
});

// Categories CRUD
app.get('/categories', async (_req, res) => {
  res.json(await prisma.category.findMany());
});
app.post('/categories', async (req, res) => {
  res.json(await prisma.category.create({ data: req.body }));
});
app.get('/categories/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.category.findUnique({ where: { id } }));
});
app.put('/categories/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.category.update({ where: { id }, data: req.body }));
});
app.delete('/categories/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.category.delete({ where: { id } }));
});

// Articles CRUD
app.get('/articles', async (_req, res) => {
  res.json(await prisma.article.findMany());
});
app.post('/articles', async (req, res) => {
  res.json(await prisma.article.create({ data: req.body }));
});
app.get('/articles/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.article.findUnique({ where: { id } }));
});
app.put('/articles/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.article.update({ where: { id }, data: req.body }));
});
app.delete('/articles/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.article.delete({ where: { id } }));
});

// Events CRUD
app.get('/events', async (_req, res) => {
  res.json(await prisma.event.findMany());
});
app.post('/events', async (req, res) => {
  res.json(await prisma.event.create({ data: req.body }));
});
app.get('/events/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.event.findUnique({ where: { id } }));
});
app.put('/events/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.event.update({ where: { id }, data: req.body }));
});
app.delete('/events/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.json(await prisma.event.delete({ where: { id } }));
});

// --- GraphQL setup ---

const typeDefs = gql`
  scalar JSON
  enum ArticleStatus { draft review scheduled published }
  enum ArticleType { vijest analiza kolumna intervju duhovnost }
  enum Denomination { katolicko pravoslavno protestantsko ekumensko }

  type Author {
    id: Int!
    name: String!
    slug: String!
    bio: String!
    avatarUrl: String!
    twitter: String
    website: String
    role: String!
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    color: String!
  }

  type Article {
    id: Int!
    slug: String!
    title: String!
    summary: String!
    content: String!
    status: ArticleStatus!
    type: ArticleType!
    denomination: Denomination!
    authorId: Int!
    categoryId: Int!
    tags: [String!]!
    sourceName: String
    sourceUrl: String
    publishedAt: String!
    updatedAt: String!
    heroImage: JSON!
    featured: Boolean!
    readingTime: Int!
    views: Int!
  }

  type Event {
    id: Int!
    title: String!
    slug: String!
    description: String!
    city: String!
    country: String!
    denomination: Denomination!
    startsAt: String!
    endsAt: String!
    heroImage: JSON!
  }

  type User {
    id: Int!
    email: String!
    createdAt: String!
  }

  input AuthorInput {
    name: String!
    slug: String!
    bio: String!
    avatarUrl: String!
    twitter: String
    website: String
    role: String!
  }

  input CategoryInput {
    name: String!
    slug: String!
    color: String!
  }

  input ArticleInput {
    slug: String!
    title: String!
    summary: String!
    content: String!
    status: ArticleStatus!
    type: ArticleType!
    denomination: Denomination!
    authorId: Int!
    categoryId: Int!
    tags: [String!]!
    sourceName: String
    sourceUrl: String
    publishedAt: String!
    updatedAt: String!
    heroImage: JSON!
    featured: Boolean!
    readingTime: Int!
    views: Int!
  }

  input EventInput {
    title: String!
    slug: String!
    description: String!
    city: String!
    country: String!
    denomination: Denomination!
    startsAt: String!
    endsAt: String!
    heroImage: JSON!
  }

  type Query {
    authors: [Author!]!
    author(id: Int!): Author
    categories: [Category!]!
    category(id: Int!): Category
    articles: [Article!]!
    article(id: Int!): Article
    events: [Event!]!
    event(id: Int!): Event
  }

  type Mutation {
    createAuthor(data: AuthorInput!): Author!
    updateAuthor(id: Int!, data: AuthorInput!): Author!
    deleteAuthor(id: Int!): Author!

    createCategory(data: CategoryInput!): Category!
    updateCategory(id: Int!, data: CategoryInput!): Category!
    deleteCategory(id: Int!): Category!

    createArticle(data: ArticleInput!): Article!
    updateArticle(id: Int!, data: ArticleInput!): Article!
    deleteArticle(id: Int!): Article!

    createEvent(data: EventInput!): Event!
    updateEvent(id: Int!, data: EventInput!): Event!
    deleteEvent(id: Int!): Event!
  }
`;

const resolvers = {
  JSON: GraphQLJSON,

  Query: {
    authors: () => prisma.author.findMany(),
    author: (_: any, args: { id: number }) =>
      prisma.author.findUnique({ where: { id: args.id } }),
    categories: () => prisma.category.findMany(),
    category: (_: any, args: { id: number }) =>
      prisma.category.findUnique({ where: { id: args.id } }),
    articles: () => prisma.article.findMany(),
    article: (_: any, args: { id: number }) =>
      prisma.article.findUnique({ where: { id: args.id } }),
    events: () => prisma.event.findMany(),
    event: (_: any, args: { id: number }) =>
      prisma.event.findUnique({ where: { id: args.id } }),
  },

  Mutation: {
    createAuthor: (_: any, args: { data: any }) =>
      prisma.author.create({ data: args.data }),
    updateAuthor: (_: any, args: { id: number; data: any }) =>
      prisma.author.update({ where: { id: args.id }, data: args.data }),
    deleteAuthor: (_: any, args: { id: number }) =>
      prisma.author.delete({ where: { id: args.id } }),

    createCategory: (_: any, args: { data: any }) =>
      prisma.category.create({ data: args.data }),
    updateCategory: (_: any, args: { id: number; data: any }) =>
      prisma.category.update({ where: { id: args.id }, data: args.data }),
    deleteCategory: (_: any, args: { id: number }) =>
      prisma.category.delete({ where: { id: args.id } }),

    createArticle: (_: any, args: { data: any }) =>
      prisma.article.create({ data: args.data }),
    updateArticle: (_: any, args: { id: number; data: any }) =>
      prisma.article.update({ where: { id: args.id }, data: args.data }),
    deleteArticle: (_: any, args: { id: number }) =>
      prisma.article.delete({ where: { id: args.id } }),

    createEvent: (_: any, args: { data: any }) =>
      prisma.event.create({ data: args.data }),
    updateEvent: (_: any, args: { id: number; data: any }) =>
      prisma.event.update({ where: { id: args.id }, data: args.data }),
    deleteEvent: (_: any, args: { id: number }) =>
      prisma.event.delete({ where: { id: args.id } }),
  },

  ArticleStatus: {
    draft: ArticleStatus.draft,
    review: ArticleStatus.review,
    scheduled: ArticleStatus.scheduled,
    published: ArticleStatus.published,
  },
  ArticleType: {
    vijest: ArticleType.vijest,
    analiza: ArticleType.analiza,
    kolumna: ArticleType.kolumna,
    intervju: ArticleType.intervju,
    duhovnost: ArticleType.duhovnost,
  },
  Denomination: {
    katolicko: Denomination.katolicko,
    pravoslavno: Denomination.pravoslavno,
    protestantsko: Denomination.protestantsko,
    ekumensko: Denomination.ekumensko,
  },
};

async function start() {
  await ensureAdmin();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

start();
