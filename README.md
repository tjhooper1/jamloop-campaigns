This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# JAM LOOP CAMPAIGNS

## Overview
This project showcases a simple POC of what it may look like to create a system that allows users to create campaigns which would help them manage their video advertising with JamLoop's connected inventory.

## Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Setup Environment Variables**
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
```

3. **Initialize Database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database with demo users
npx prisma db seed

# Prisma Studio - View the database
npx prisma studio
```

4. **Start Development Server**
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Demo Accounts
Two demo accounts are available after seeding:
- Email: user1@example.com / Password: password123
- Email: user2@example.com / Password: password456

## Technologies Used
- Next.js 15
- React 19
- Prisma
- NextAuth.js
- TypeScript
- Tailwind CSS
- Zod for validation

## Development Notes
- Uses the new Next.js App Router
- Server components and actions for data mutations
- Form validation with Zod
- Authentication with NextAuth.js
- SQLite database for simplicity


