# Param Soni Portfolio - Setup Instructions

## Prerequisites

- **Node.js**: Version 16.x or later
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation with `node -v` and `npm -v`

- **Git**: Latest version
  - Download from [git-scm.com](https://git-scm.com/downloads)
  - Verify installation with `git --version`

- **Code Editor**: Visual Studio Code (recommended)
  - Download from [code.visualstudio.com](https://code.visualstudio.com/)

## Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/param-soni-portfolio.git

# Navigate to the project directory
cd param-soni-portfolio
```

## Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn if you prefer
yarn install
```

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
# Create .env.local file from example
cp .env.example .env.local
```

2. Open the `.env.local` file and update the Supabase credentials if you have them:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_BASE_PATH=/
VITE_TEMPO=false
```

> **Note**: If you don't have Supabase credentials, the application will run with mock data.

## Step 4: Start the Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

This will start the development server at [http://localhost:5173](http://localhost:5173)

## Step 5: Build for Production

When you're ready to deploy your application:

```bash
# Using npm
npm run build

# OR using yarn
yarn build
```

The build output will be in the `dist` directory.

## Supabase Setup (Optional)

If you want to use Supabase as your backend:

1. Create an account at [supabase.com](https://supabase.com)
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

4. Get your Supabase URL and anon key from the project settings
5. Update your `.env.local` file with these credentials

## Troubleshooting

### Common Issues

1. **Node.js version incompatibility**
   - Ensure you're using Node.js version 16 or later
   - If using nvm: `nvm use 16`

2. **Port already in use**
   - If port 5173 is already in use, Vite will automatically try the next available port
   - You can also specify a different port: `npm run dev -- --port 3000`

3. **Supabase connection issues**
   - Verify your Supabase URL and anon key are correct
   - Check if your IP is allowed in Supabase project settings
   - The app will use mock data if Supabase connection fails

4. **Build errors**
   - Run `npm run build` to see detailed error messages
   - Check for TypeScript errors with `npx tsc --noEmit`

### Getting Help

If you encounter any issues not covered here, please:

1. Check the [Vite documentation](https://vitejs.dev/guide/)
2. Check the [React documentation](https://reactjs.org/docs/getting-started.html)
3. Check the [Supabase documentation](https://supabase.io/docs)

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Router Documentation](https://reactrouter.com/docs/en/v6)
