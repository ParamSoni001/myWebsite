# Param Soni Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Modern animations with Framer Motion
- Supabase integration for backend functionality
- Portfolio project showcase
- Certification display
- Contact form with validation
- Resume page

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/param-soni-portfolio.git
   cd param-soni-portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Update the values in `.env.local` with your Supabase credentials

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Supabase Setup

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Set up the following tables in your Supabase database:

   ### Projects Table
   ```sql
   CREATE TABLE projects (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     process TEXT NOT NULL,
     tools TEXT[] NOT NULL,
     images TEXT[] NOT NULL,
     link TEXT,
     codeLink TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   ### Certifications Table
   ```sql
   CREATE TABLE certifications (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     title TEXT NOT NULL,
     issuer TEXT NOT NULL,
     date TEXT NOT NULL,
     imageUrl TEXT NOT NULL,
     certificationUrl TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   ### Contact Messages Table
   ```sql
   CREATE TABLE contact_messages (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

4. Get your Supabase URL and anon key from the project settings and add them to your `.env.local` file

## Deployment

### Build for production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory, which you can deploy to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Supabase
- React Router
- Zod (for form validation)
- Lucide React (for icons)
- Shadcn UI components

## License

This project is licensed under the MIT License.
