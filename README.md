# Vjera Hub

This project combines a small Express API with a React frontend. The backend lives in the `server/` folder while the frontend source is in `src/`.

## Requirements
* Node.js 18+
* PostgreSQL database

## Setup

1. Copy `.env.example` to `.env` and update the values for your database connection and JWT secret.
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
   The API will be available at `http://localhost:4000` with REST and GraphQL endpoints.
5. In a separate terminal run the frontend:
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
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"secret"}'
```
