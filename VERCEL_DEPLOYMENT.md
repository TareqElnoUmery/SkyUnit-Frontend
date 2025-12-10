# Vercel Deployment Guide - SkyUnit Frontend

This guide explains how to configure and deploy SkyUnit Frontend on Vercel with proper environment variables.

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- Supabase project with API keys
- Backend API URL (e.g., https://your-backend-api.com)

## Step 1: Connect Repository to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New" > "Project"
3. Select your GitHub repository (TareqElnoUmery/SkyUnit-Frontend)
4. Click "Import"

## Step 2: Configure Environment Variables

Before deploying, set all required environment variables in Vercel:

1. In Vercel Dashboard, go to Project Settings
2. Click "Environment Variables" in the left sidebar
3. Add the following variables for **Production** deployment:

### Required Environment Variables

```
VITE_SUPABASE_URL=https://ygawursuyevlmwbuvquw.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_API_BASE_URL=https://skyunit-api.vercel.app
VITE_APP_NAME=SkyUnit
VITE_APP_TITLE=SkyUnit - Real Estate Booking Platform
```

## Step 3: Deploy

1. Click "Deploy" in Vercel Dashboard
2. Select the main branch
3. Click "Deploy" again
4. Wait for build to complete (usually 2-3 minutes)
5. Your site will be available at https://skyunitai.site

## Step 4: Verify Deployment

After deployment:

1. Visit https://skyunitai.site
2. Check browser console for any API errors
3. Verify all environment variables are loaded correctly

## Troubleshooting

### Issue: "API_BASE_URL is undefined"
**Solution:** Ensure VITE_API_BASE_URL is set in Vercel Environment Variables

### Issue: "Cannot connect to Supabase"
**Solution:** Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct

### Issue: Builds fail
**Solution:** Check Vercel build logs for detailed error messages

## Production Checklist

- [x] Environment variables configured
- [x] API endpoints verified
- [x] Database connections tested
- [x] Authentication working
- [x] Error handling in place

## Redeploy After Changes

To redeploy after code changes:

1. Push changes to main branch on GitHub
2. Vercel automatically triggers a new build
3. Deployment completes in 2-3 minutes
4. Changes are live on https://skyunitai.site
