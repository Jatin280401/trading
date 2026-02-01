# Deployment Guide (Netlify)

Since this application uses a database and server-side logic, you cannot simply upload a folder. Follow these steps to deploy successfully.

## ⚠️ Critical: Database Migration
**Local SQLite (`dev.db`) will NOT work on Netlify** because the file system is read-only. You must switch to a cloud database.

### 1. Get a Cloud Database (Free)
We recommend **[Neon](https://neon.tech)** (Postgres) or **[Turso](https://turso.tech)** (SQLite equivalent).
1. Sign up at [Neon.tech](https://neon.tech).
2. Create a project and copy the **Connection String** (Postgres URL).

### 2. Update Your Code
1. Open `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql" // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
2. Update `.env`:
   ```bash
   DATABASE_URL="postgres://user:password@..." # Your Neon URL
   ```
3. Generate Client:
   ```bash
   npx prisma generate
   ```

## Deployment Steps

### 1. Push to GitHub
1. Create a new repository on GitHub.
2. Push your code:
   ```bash
   git add .
   git commit -m "Ready for deploy"
   git branch -M main
   # Replace with your repo URL
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### 2. Connect to Netlify
1. Log in to Netlify > **Add new site** > **Import an existing project**.
2. Select **GitHub** and choose your repository.
3. Netlify will detect Next.js automatically.

### 3. Configure Environment Variables
In the Netlify Site Settings > **Environment variables**, add:
- `DATABASE_URL`: Your Neon Postgres URL (Connection Pooling URL recommended).
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk Public Key.
- `CLERK_SECRET_KEY`: Your Clerk Secret Key.

### 4. Deploy
Click **Deploy**. Netlify will build your app.
*Note: During the build, run `npx prisma migrate deploy` if needed, or run the migration from your local machine against the production DB URL.*
