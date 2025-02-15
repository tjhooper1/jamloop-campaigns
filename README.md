# JAM LOOP CAMPAIGNS

## Overview
This project showcases a simple POC of what it may look like to create a system that allows users to create campaigns which would help them manage their video advertising with JamLoop's connected inventory.

## Screenshots

### Homescreen
![Campaign Dashboard](docs/dashboard.png)
*This is the homescreen. For now, it just shows you a campaign button.*

### Campaign Dashboard
![Create Campaign Form](docs/campaigns.png)
*View and manage all your campaigns in one place*

### Edit Campaign
![Edit Campaign](docs/campaign-edit.png)
*Easily update existing campaigns*

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

## Things I would like to add before launch
- Add monitoring and analytics
- Add more error handling
- Add more validation
- Add more authentication
- Add better styling
- Make the UI more server side rendered
- Install a component library
- Consolidate styles into tailwind config
- Add unit tests
- Add Cypress tests
- Implement better UX for the create/edit forms (typeahead, autocomplete, throttle, debounce, etc)



