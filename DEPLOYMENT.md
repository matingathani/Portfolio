# Portfolio Deployment Guide

## Quick Deployment Steps

### 1. Create GitHub Repository
1. Go to github.com
2. Click "New repository"
3. Name it: `portfolio` or `matin-gathani-portfolio`
4. Make it **Public** (required for free deployment)
5. Don't initialize with README (we already have files)

### 2. Push to GitHub
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push your code
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your repository
4. Click "Deploy"
5. Your site will be live in 2-3 minutes!

### 4. Deploy to Netlify (Alternative)
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

## Custom Domain Setup

### For Vercel:
1. Go to project dashboard
2. Settings → Domains
3. Add custom domain
4. Follow DNS instructions

### Domain Options:
- **Free:** `.tk`, `.ml`, `.ga` (Freenom)
- **Paid:** `.com`, `.dev`, `.io` (Namecheap, GoDaddy)

## Your Portfolio Features:
✅ Responsive design
✅ 3D animations
✅ Your actual resume data
✅ Contact form
✅ Professional styling
✅ Fast loading
✅ SEO optimized

## Live URLs:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`
- Custom: `https://yourdomain.com`
