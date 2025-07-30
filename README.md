# Vjera Hub

This project combines a small Express API with a React frontend. The backend lives in the `server/` folder while the frontend source is in `src/`.

## Requirements
* Node.js 18+
* PostgreSQL database

## Setup

1. Copy `.env.example` to `.env` and update the values for your database connection, JWT secret and `VITE_API_BASE` if needed. This file is ignored by Git so your credentials stay local.
2. Install dependencies and run the database migrations:
   ```bash
   npm install
   npm run migrate -- --schema server/prisma/schema.prisma
   ```
3. Seed the database with sample data:
   ```bash
   npm run seed
   ```
4. Start the API server:
   ```bash
   npm run server
   ```

   ```bash
   npm run dev
   ```
   The site is served on `http://localhost:8080`.

### Default credentials

The API automatically ensures an administrator account exists:

- **Email:** `amir@yahoo.com`
- **Password:** `123456`

Use these credentials on the `/login` page to access the dashboard. To create additional users run:
```bash
curl -X POST $VITE_API_BASE/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"secret"}'
```
