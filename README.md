# Artist Onboarding System

A professional artist onboarding platform built with Next.js, React, and Supabase.

## Features

- **4-Section Onboarding Flow**: Complete artist profile setup
- **Database Integration**: Real-time data with Supabase
- **Admin Dashboard**: Manage artists and applications
- **Beautiful UI**: Modern design with Tailwind CSS and shadcn/ui
- **TypeScript**: Full type safety and development experience

## Technology Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui
- **Database**: Supabase
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── admin/          # Admin dashboard
│   ├── onboarding/     # Onboarding system
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── ui/             # shadcn/ui components
│   └── onboarding/     # Onboarding sections
└── lib/
    ├── utils.ts        # Utility functions
    └── supabase/       # Database configuration
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

This project is configured for deployment on Vercel with automatic GitHub integration.

## License

Private - All rights reserved
