# Interview & Task Manager

A comprehensive full-stack application for managing interviews and tasks, built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Authentication & User Management**
  - User registration and login with Supabase Auth
  - Profile management with editing capabilities
  - Secure password reset functionality

- **Interview Management**
  - Create interviews with company details, dates, and locations
  - Status tracking (pending, passed, failed, rescheduled)
  - Reschedule interviews with new date selection
  - Full CRUD operations for interviews

- **Task Management**
  - Create tasks with descriptions and due dates
  - Priority levels (low, medium, high)
  - Status tracking (pending, completed, cancelled)
  - Full CRUD operations for tasks

- **Dashboard & Analytics**
  - Real-time statistics for interviews and tasks
  - Responsive design with mobile-first approach
  - Glass morphism UI effects
  - Horizontal scrolling sections

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Real-time)
- **Database**: PostgreSQL with Row Level Security
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd interview-task-manager
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

### 4. Set up Database Schema

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the migration script from `supabase/migrations/001_initial_schema.sql`

### 5. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
├── supabase/             # Database migrations
└── public/               # Static assets
\`\`\`

## Key Components

### Authentication
- **Login Page**: Beautiful responsive login form with glass morphism
- **Register Page**: User registration with form validation
- **Protected Routes**: Automatic redirect for unauthenticated users

### Dashboard Layout
- **Sidebar Navigation**: Desktop sidebar with workspace branding
- **Mobile Navigation**: Bottom navigation bar for mobile devices
- **Header**: Search functionality and user actions

### Data Management
- **Real-time Updates**: Automatic data synchronization with Supabase
- **Row Level Security**: Secure data access per user
- **CRUD Operations**: Full create, read, update, delete functionality

## Responsive Design

The application is fully responsive with:
- Desktop: Sidebar navigation with full layout
- Tablet: Adapted layout with responsive grid
- Mobile: Bottom navigation with optimized touch targets

## Security Features

- Row Level Security (RLS) enabled on all tables
- User authentication with Supabase Auth
- Protected API routes and pages
- Secure data access patterns

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the GAMEFUXION.
