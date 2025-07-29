# Vjera Hub Project

This directory contains an exported snapshot of the **Vjera Hub** project from [Lovable](https://lovable.dev).  The original project lives at:

```
https://lovable.dev/projects/36820b65-f536-4f4f-baef-e50c17c50536
```

The contents here mirror the folder structure and source files visible in Lovable's code view.  You can continue building the project in Lovable or use this as a reference in your own IDE.
## Backend

A simple Express + Prisma backend lives in the `server/` folder. The project uses SQLite by default but can switch to another database by editing `DATABASE_PROVIDER` and `DATABASE_URL` in `.env`.

### Setup

1. Copy `server/.env.example` to `server/.env` and adjust the values.
2. Install dependencies and run database migrations:

```bash
npm install
npm run migrate -- --schema server/prisma/schema.prisma
```

3. Start the backend in development mode:

```bash
npm run server
```

This starts the API on `http://localhost:4000` with both REST endpoints and GraphQL available at `/graphql`.

