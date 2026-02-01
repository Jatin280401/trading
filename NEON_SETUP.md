# Neon Database Setup

1. **Create an Account**: Go to [Neon.tech](https://neon.tech) and sign up.
2. **Create Project**: Create a new project (e.g., `trading-platform`).
3. **Get Connection String**:
   - On the Dashboard, look for "Connection Details".
   - Copy the connection string. It will look like:
     `postgres://neondb_owner:AbC123...@ep-shiny-....aws.neon.tech/neondb?sslmode=require`

4. **Update `.env`**:
   - Open your `.env` file in the project.
   - Replace the `DATABASE_URL` line with your new Neon string:
     ```bash
     DATABASE_URL="postgres://neondb_owner:..."
     ```

5. **Initialize Database**:
   - Run this command in your VS Code terminal:
     ```bash
     npx prisma migrate dev --name init_neon
     ```

6. **Environment**:
   - You can now deploy! When deploying to Netlify, just add this same `DATABASE_URL` to the Netlify Environment Variables.
