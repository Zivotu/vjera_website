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

## Frontend

1. Start the Vite development server in a separate terminal:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Authentication and Dashboard

1. Register a user (only once) by sending a POST request to the backend:

```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}'
```

2. Visit `http://localhost:5173/login` and log in with the credentials you created. After successful login you will be redirected to the dashboard.

3. The dashboard at `http://localhost:5173/dashboard` displays articles fetched from `/articles` and can only be accessed while a token is stored in `localStorage`.

