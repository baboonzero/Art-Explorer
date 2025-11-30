# Netlify Deployment Guide

## Quick Deployment Steps

### Prerequisites
- ✅ Your code is ready (already done!)
- ✅ Git repository initialized
- ✅ Production build tested and working

---

## Method 1: Deploy via Netlify Website (Recommended)

### Step 1: Prepare Your Code
1. **Commit your changes** (if not already committed):
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   ```

2. **Push to GitHub/GitLab/Bitbucket**:
   ```bash
   git push origin master
   ```
   (If you don't have a remote repository yet, create one on GitHub first)

### Step 2: Sign Up / Log In to Netlify
1. Go to [netlify.com](https://www.netlify.com)
2. Click **"Sign up"** or **"Log in"**
3. Choose to sign up with:
   - **GitHub** (recommended - easiest integration)
   - GitLab
   - Bitbucket
   - Email

### Step 3: Create New Site
1. Once logged in, click **"Add new site"** → **"Import an existing project"**
2. Choose your Git provider (GitHub/GitLab/Bitbucket)
3. Authorize Netlify to access your repositories
4. Select your `art-explorer` repository

### Step 4: Configure Build Settings
Netlify should auto-detect Vite, but verify these settings:

**Build settings:**
- **Base directory:** Leave empty (or `./` if needed)
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `18` (or latest LTS)

**Note:** The `netlify.toml` file in your project will automatically configure these settings, so you can usually just click "Deploy site"!

### Step 5: Deploy
1. Click **"Deploy site"**
2. Wait for the build to complete (2-3 minutes)
3. You'll see a success message with your site URL

### Step 6: Verify Deployment
1. Visit your Netlify URL (e.g., `art-explorer-123abc.netlify.app`)
2. Test all features:
   - ✅ Browse artworks by style
   - ✅ Search functionality
   - ✅ Add/remove favorites (localStorage)
   - ✅ Card flip interactions
   - ✅ Full-screen image view
   - ✅ Mobile responsiveness

---

## Method 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```
This will open your browser to authenticate.

### Step 3: Initialize Site (First Time)
```bash
netlify init
```
Follow the prompts:
- Create & configure a new site
- Choose your team
- Build command: `npm run build`
- Directory to deploy: `dist`

### Step 4: Deploy
```bash
netlify deploy --prod
```

For preview deployments (before production):
```bash
netlify deploy
```

---

## Method 3: Drag & Drop Deployment

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Drag & Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your `dist` folder onto the page
3. Wait for deployment (30 seconds - 1 minute)
4. Get your live URL!

**Note:** This method doesn't connect to Git, so you'll need to redeploy manually for updates.

---

## Post-Deployment Configuration

### Custom Domain (Optional)
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `artexplorer.com`)
4. Follow DNS configuration instructions:
   - Add CNAME record pointing to your Netlify site
   - Or add A record with Netlify's IP addresses
5. Wait for DNS propagation (up to 48 hours)

### Environment Variables (If Needed)
If you need environment variables later:
1. Go to **Site settings** → **Environment variables**
2. Add any required variables
3. Redeploy the site

### Continuous Deployment
- ✅ **Already enabled!** Netlify automatically deploys when you push to your connected Git branch
- Default branch: `master` or `main`
- Preview deployments are created for pull requests

### Branch Deploys
- **Production branch:** `master` or `main` (auto-deploys)
- **Preview branches:** Other branches get preview URLs
- **Deploy previews:** Pull requests get automatic preview deployments

---

## Netlify Configuration File

The `netlify.toml` file in your project root contains:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

**What this does:**
- Sets build command and output directory
- Configures SPA routing (redirects all routes to index.html)
- Sets Node.js version

---

## Troubleshooting

### Build Fails
1. Check build logs in Netlify dashboard
2. Verify Node version (should be 18+)
3. Ensure `package.json` has correct build script
4. Check for any missing dependencies

### 404 Errors on Routes
- The `netlify.toml` redirect rule should fix this
- If issues persist, verify the redirect is in place

### Environment Variables Not Working
- Make sure they're set in Netlify dashboard
- Redeploy after adding variables

### Build Timeout
- Free tier: 15 minutes max
- If build takes longer, optimize your build process

---

## Netlify Features You Can Use

### 1. Forms (If You Add Contact Form Later)
- Netlify automatically processes form submissions
- View submissions in dashboard

### 2. Functions (Serverless)
- Add serverless functions in `netlify/functions/`
- Useful for API proxies or backend logic

### 3. Split Testing
- A/B test different versions
- Available in paid plans

### 4. Analytics
- Netlify Analytics (paid)
- Or integrate Google Analytics

### 5. Headers & Redirects
- Configure in `netlify.toml`
- Or in Netlify dashboard

---

## Quick Commands Reference

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to production
netlify deploy --prod

# Deploy preview
netlify deploy

# Open Netlify dashboard
netlify open

# View site status
netlify status

# View logs
netlify logs
```

---

## Next Steps After Deployment

1. ✅ Test your live site thoroughly
2. ✅ Set up custom domain (optional)
3. ✅ Monitor build logs for any issues
4. ✅ Set up analytics (optional)
5. ✅ Share your site URL!

---

## Support

- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Netlify Community:** [community.netlify.com](https://community.netlify.com)
- **Status Page:** [status.netlify.com](https://status.netlify.com)

---

**Your app is ready to deploy! 🚀**


