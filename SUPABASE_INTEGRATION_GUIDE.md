# Supabase Integration Guide for Param Soni Portfolio

## Overview

This guide provides detailed instructions on how to use Supabase with your portfolio application, including how to view and manage user messages from the contact form, and how to update your portfolio content.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Your portfolio application codebase
- Basic understanding of SQL

## Step 1: Setting Up Supabase Tables

### Creating the Required Tables

1. Log in to your Supabase dashboard at [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to the SQL Editor section
4. Create the following tables by executing these SQL commands:

```sql
-- Projects Table
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

-- Certifications Table
CREATE TABLE certifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  certificationUrl TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Step 2: Adding Sample Data

### Adding a Project

```sql
INSERT INTO projects (title, description, process, tools, images, link, codeLink)
VALUES (
  'Java Database Application',
  'A robust database application built with Java SE11 and MySQL',
  'This project involved designing a normalized database schema, implementing JDBC connectivity, and creating a clean user interface for database operations. The application supports CRUD operations with transaction management and prepared statements for security.',
  ARRAY['IntelliJ IDEA', 'MySQL Workbench', 'Apache Tomcat', 'Apache JMeter'],
  ARRAY[
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=800&q=80',
    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80'
  ],
  'https://example.com/project',
  'https://github.com/example/project'
);
```

### Adding a Certification

```sql
INSERT INTO certifications (title, issuer, date, imageUrl, certificationUrl)
VALUES (
  'Oracle Certified Professional Java SE11 Developer',
  'Oracle University',
  'April 2024',
  'https://education.oracle.com/file/general/Oracle-Certification-badge.png',
  'https://catalog-education.oracle.com/ords/certview/sharebadge?id=AB1CBB48460B50E194663E42509D3D74FCCE2635A711CC8936AAEA2811B1BF96'
);
```

## Step 3: Configuring Environment Variables

1. In your project, make sure your `.env.local` file contains the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Get these values from your Supabase project settings (API section)

## Step 4: Viewing Contact Form Submissions

### Through Supabase Dashboard

1. Log in to your Supabase dashboard
2. Go to the Table Editor
3. Select the `contact_messages` table
4. You'll see all form submissions with name, email, message, and timestamp

### Setting Up Email Notifications (Optional)

1. Go to the SQL Editor in your Supabase dashboard
2. Create a database function and trigger to send emails when new messages arrive:

```sql
-- First, enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the function to send email notifications
CREATE OR REPLACE FUNCTION notify_new_message()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      'https://api.sendgrid.com/v3/mail/send',
      '{
        "personalizations": [{
          "to": [{
            "email": "your-email@example.com"
          }]
        }],
        "from": {
          "email": "notifications@your-domain.com"
        },
        "subject": "New Contact Form Submission",
        "content": [{
          "type": "text/plain",
          "value": "You received a new message from ' || NEW.name || ' (' || NEW.email || '): ' || NEW.message || '"
        }]
      }',
      '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SENDGRID_API_KEY"}'
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER on_new_message
AFTER INSERT ON contact_messages
FOR EACH ROW
EXECUTE FUNCTION notify_new_message();
```

Note: Replace `your-email@example.com`, `notifications@your-domain.com`, and `YOUR_SENDGRID_API_KEY` with your actual information.

## Step 5: Making Your Site Responsive to Supabase Changes

### Real-time Updates

To make your site update in real-time when data changes in Supabase, add the following to your components:

```typescript
// Example for ProjectGrid.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

function ProjectGrid() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Initial fetch
    fetchProjects();
    
    // Set up real-time subscription
    const subscription = supabase
      .from('projects')
      .on('*', payload => {
        console.log('Change received!', payload);
        fetchProjects(); // Refetch when data changes
      })
      .subscribe();
    
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data || []);
  }

  // Rest of your component...
}
```

## Step 6: Deploying Your Application for Free

### Option 1: Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add your environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
5. Deploy

### Option 2: Netlify

1. Create an account on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Add your environment variables
5. Deploy

### Option 3: GitHub Pages

1. Install the gh-pages package: `npm install --save-dev gh-pages`
2. Add these scripts to your package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Update your vite.config.ts to include the correct base path:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // other config
   });
   ```
4. Deploy with: `npm run deploy`

## Fixing the "Site Cannot Be Reached" Issue

If you're experiencing the "site cannot be reached" error when accessing http://localhost:5173, try these solutions:

1. **Check if the development server is running**
   - Make sure you've started the development server with `npm run dev`
   - Check the terminal for any error messages

2. **Try a different port**
   - Run the dev server on a different port: `npm run dev -- --port 3000`
   - Then access http://localhost:3000

3. **Check firewall settings**
   - Ensure your firewall isn't blocking the connection

4. **Verify network configuration**
   - Try using `127.0.0.1:5173` instead of `localhost:5173`

5. **Restart the development server**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

## Advanced Supabase Features

### Authentication (Optional)

If you want to add an admin area to manage your portfolio:

1. Enable email authentication in Supabase Auth settings
2. Create a simple login page
3. Set up Row Level Security (RLS) policies to protect your data

```sql
-- Example RLS policy for projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Public can view projects" 
ON projects FOR SELECT 
USING (true);

-- Only authenticated users can modify
CREATE POLICY "Only authenticated users can modify projects" 
ON projects FOR INSERT UPDATE DELETE
USING (auth.role() = 'authenticated');
```

### Storage for Images

To use Supabase Storage for your project images:

1. Create a new bucket in the Storage section of Supabase
2. Set up appropriate policies
3. Upload images and use the generated URLs in your projects table

## Conclusion

Your portfolio is now fully integrated with Supabase, providing dynamic content management and contact form functionality. You can easily update your projects and certifications through the Supabase dashboard or build an admin interface to manage your content.

For any issues or questions, refer to the [Supabase documentation](https://supabase.io/docs) or reach out to the Supabase community on GitHub or Discord.
