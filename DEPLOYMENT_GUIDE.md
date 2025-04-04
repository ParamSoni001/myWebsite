# Deployment Guide for Param Soni Portfolio

## Introduction

This guide provides step-by-step instructions for deploying your portfolio application to various cloud platforms for free. We'll cover multiple options so you can choose the one that best fits your needs.

## Option 1: Vercel (Recommended)

Vercel is a cloud platform for static sites and Serverless Functions that's perfect for React applications. It offers a generous free tier and integrates seamlessly with GitHub.

### Steps to Deploy on Vercel

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com) and sign up (GitHub login recommended)

2. **Connect Your Repository**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - If your repository is private, you may need to grant Vercel access

3. **Configure Project Settings**
   - Framework Preset: Select "Vite"
   - Build Command: `npm run build` (should be auto-detected)
   - Output Directory: `dist` (should be auto-detected)
   - Root Directory: `./` (or the directory containing your package.json)

4. **Add Environment Variables**
   - Add your Supabase credentials:
     - VITE_SUPABASE_URL
     - VITE_SUPABASE_ANON_KEY
   - Add any other environment variables your application needs

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually takes 1-2 minutes)

6. **Set Up Custom Domain (Optional)**
   - Go to "Settings" → "Domains"
   - Add your custom domain (e.g., paramsoni.dev)
   - Follow the instructions to configure DNS settings

### Continuous Deployment

Vercel automatically redeploys your site when you push changes to your repository. You can configure which branches trigger deployments in the project settings.

## Option 2: Netlify

Netlify is another excellent platform for deploying static sites with a generous free tier.

### Steps to Deploy on Netlify

1. **Create a Netlify Account**
   - Go to [netlify.com](https://netlify.com) and sign up

2. **Connect Your Repository**
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

4. **Add Environment Variables**
   - Go to "Site settings" → "Build & deploy" → "Environment"
   - Add your Supabase credentials and any other required variables

5. **Deploy**
   - Click "Deploy site"

6. **Set Up Custom Domain (Optional)**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow the instructions to configure DNS settings

## Option 3: GitHub Pages

GitHub Pages is a free hosting service provided by GitHub. It's slightly more complex to set up for Vite applications but still a viable option.

### Steps to Deploy on GitHub Pages

1. **Install the gh-pages Package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these scripts to your package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',  // Replace with your actual repository name
     // other config options...
   });
   ```

4. **Create a .env.production File**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Deploy**
   ```bash
   npm run deploy
   ```

6. **Configure GitHub Repository**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Set the source to the "gh-pages" branch

## Option 4: Render

Render is a unified cloud platform that offers free static site hosting.

### Steps to Deploy on Render

1. **Create a Render Account**
   - Go to [render.com](https://render.com) and sign up

2. **Create a New Static Site**
   - Click "New" → "Static Site"
   - Connect your GitHub repository

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

4. **Add Environment Variables**
   - Add your Supabase credentials in the "Environment" section

5. **Deploy**
   - Click "Create Static Site"

## Fixing Local Development Issues

If you're experiencing the "site cannot be reached" error when accessing http://localhost:5173, try these solutions:

### Solution 1: Check if the Server is Running

- Make sure you've started the development server with `npm run dev`
- Check the terminal for any error messages
- The terminal should show a message like "Local: http://localhost:5173/"

### Solution 2: Try a Different Port

```bash
npm run dev -- --port 3000
```

Then access http://localhost:3000

### Solution 3: Check Network Configuration

- Try using `127.0.0.1:5173` instead of `localhost:5173`
- Check if your firewall is blocking the connection

### Solution 4: Check for Process Conflicts

- Another process might be using port 5173
- Find and terminate the process:

  **On Windows:**
  ```bash
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  ```

  **On macOS/Linux:**
  ```bash
  lsof -i :5173
  kill -9 <PID>
  ```

### Solution 5: Restart Development Server

- Stop the current server (Ctrl+C in the terminal)
- Run `npm run dev` again

## Conclusion

Your portfolio application is now deployed and accessible to anyone on the internet. Remember to keep your repository updated and push changes regularly to ensure your deployed site stays current.

For any issues or questions, refer to the documentation of your chosen deployment platform or reach out to their support communities.
