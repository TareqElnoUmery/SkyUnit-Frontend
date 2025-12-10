# QUICK DEPLOYMENT FIX - Get SkyUnit Site Live in 5 Minutes

## Problem
The website at https://skyunitai.site is loading but without dynamic content and API data.

## Root Cause
**Missing Environment Variables in Vercel**

The Vercel deployment doesn't have the required `VITE_` prefixed environment variables configured.

## Solution (5 Minutes)

### Step 1: Go to Vercel Dashboard (2 minutes)
```
1. Visit: https://vercel.com/dashboard
2. Find project: sky-unit-frontend OR skyunit-frontend-production
3. Click Settings tab
4. Select "Environment Variables" from left sidebar
```

### Step 2: Add Required Variables (2 minutes)

For **Production** environment, add these variables:

```
VITE_SUPABASE_URL = https://ygawursuyevlmwbuvquw.supabase.co
VITE_SUPABASE_ANON_KEY = (Get from Supabase Dashboard)
VITE_API_BASE_URL = https://skyunit-api.vercel.app
VITE_APP_NAME = SkyUnit
VITE_APP_TITLE = SkyUnit - Real Estate Booking Platform
```

### Step 3: Trigger Redeployment (1 minute)

```
1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment
3. Wait 2-3 minutes for build to complete
4. Visit https://skyunitai.site - DONE!
```

## Getting Supabase Anon Key

1. Go to: https://app.supabase.com/project/ygawursuyevlmwbuvquw/settings/api
2. Copy `anonKey` value
3. Paste in Vercel as `VITE_SUPABASE_ANON_KEY`

## Verify It Works

After redeployment:
```
✓ Visit https://skyunitai.site
✓ Should load full UI with no console errors
✓ API calls should work
✓ Supabase connection established
```

## Troubleshooting

If still not working:

1. **Check Console Errors** (F12 > Console tab)
   - If `VITE_` variable is undefined, variable not set
   - If CORS error, update Backend CORS settings

2. **Verify Vercel Logs**
   - Click on failed deployment
   - Check build logs for errors

3. **Confirm Variables Exist**
   - Vercel Settings > Environment Variables
   - Each variable should show with correct value

## Next Steps

After site is live:

1. Add real estate properties to Supabase
2. Test booking flow
3. Verify user authentication
4. Monitor error logs

## Done!

Your SkyUnit platform is now **fully operational** at https://skyunitai.site! 🚀
