# ONTIME Deployment Guide

This guide covers deploying the ONTIME Courier Tracking System to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ontime-courier-system)

### Option 2: Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/ontime-courier-system)

## 📋 Pre-Deployment Checklist

- [ ] Code is committed to GitHub/GitLab
- [ ] All environment variables are documented
- [ ] Build process works locally (`npm run build`)
- [ ] All tests pass (if applicable)
- [ ] Admin credentials are secure

## 🔧 Platform-Specific Instructions

### Vercel Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub/GitLab

2. **Configure Build Settings**
   \`\`\`bash
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   \`\`\`

3. **Environment Variables**
   \`\`\`bash
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   \`\`\`

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Access your live site

### Netlify Deployment

1. **Build Configuration**
   Create `netlify.toml`:
   \`\`\`toml
   [build]
     command = "npm run build"
     publish = "out"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   \`\`\`

2. **Deploy Steps**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `out`
   - Deploy

### Railway Deployment

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub

2. **Configuration**
   \`\`\`bash
   Build Command: npm run build
   Start Command: npm start
   \`\`\`

3. **Environment Variables**
   Set in Railway dashboard

### DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean Apps
   - Connect GitHub repository

2. **Build Settings**
   \`\`\`yaml
   name: ontime-courier
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/ontime-courier-system
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
   \`\`\`

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as shown

### Netlify
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Update DNS records

## 🔒 Environment Variables

### Required Variables
\`\`\`bash
# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
\`\`\`

### Setting Environment Variables

**Vercel:**
- Dashboard > Project > Settings > Environment Variables

**Netlify:**
- Site Settings > Environment Variables

**Railway:**
- Project > Variables tab

## 📊 Performance Optimization

### Build Optimization
\`\`\`bash
# Enable experimental features in next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
\`\`\`

### CDN Configuration
- Enable automatic CDN on Vercel/Netlify
- Configure image optimization
- Enable compression

## 🔍 Monitoring & Analytics

### Error Tracking
\`\`\`bash
# Add to your deployment
npm install @sentry/nextjs
\`\`\`

### Performance Monitoring
- Enable Vercel Analytics
- Set up Google Analytics
- Monitor Core Web Vitals

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
\`\`\`bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
\`\`\`

**Memory Issues:**
\`\`\`bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
\`\`\`

**Map Loading Issues:**
- Ensure Leaflet CSS is loaded
- Check for SSR conflicts with dynamic imports

### Debug Mode
\`\`\`bash
# Enable debug logging
DEBUG=* npm run dev
\`\`\`

## 📱 Mobile Testing

Test on multiple devices:
- iOS Safari
- Android Chrome
- Various screen sizes
- Touch interactions

## 🔄 CI/CD Pipeline

### GitHub Actions Example
\`\`\`yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
\`\`\`

## 📈 Post-Deployment

### Health Checks
- [ ] All pages load correctly
- [ ] Admin login works
- [ ] Tracking functionality works
- [ ] Maps display properly
- [ ] PDF generation works
- [ ] Mobile responsiveness

### SEO Setup
- [ ] Add sitemap.xml
- [ ] Configure meta tags
- [ ] Set up Google Search Console
- [ ] Add structured data

### Security
- [ ] Enable HTTPS
- [ ] Configure security headers
- [ ] Set up monitoring
- [ ] Regular security updates

---

**Need help?** Contact support at support@ontime-delivery.com
