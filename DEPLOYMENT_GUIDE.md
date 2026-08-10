# 📚 Complete Deployment Guide for Tascade

## Overview

This guide walks you through deploying Tascade (a MERN stack application) to:
- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** MongoDB Atlas

All platforms offer free tiers, so deployment costs nothing!

---

## Prerequisites

Before starting, make sure you have:
- A GitHub account
- Your forked Tascade repository
- Internet connection

You'll create free accounts on:
- Vercel
- Railway
- MongoDB Atlas
- OpenRouter (for AI features)

---

## Part 1: MongoDB Atlas Database Setup

### 1.1 Create MongoDB Account

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or Google/GitHub account
4. Verify your email

### 1.2 Create a Project

1. Click "Create an organization" or use existing one
2. Name it "Tascade" (or anything you want)
3. Click "Create Organization"
4. Click "New Project"
5. Name it "Tascade"
6. Click "Create Project"

### 1.3 Create a Cluster

1. Click "Build a Database"
2. Choose **M0 (Free)** tier
3. Select cloud provider (AWS, Google Cloud, or Azure)
4. Select your preferred region
5. Click "Create Cluster"
6. Wait 2-3 minutes for cluster to be created

### 1.4 Add Database User

1. Go to "Database Access" tab
2. Click "Add New Database User"
3. Enter:
   - **Username:** `tascade_user`
   - **Password:** Generate a strong password (save it!)
   - **Built-in Role:** Select "Atlas Admin"
4. Click "Create Database User"

### 1.5 Configure Network Access

1. Go to "Network Access" tab
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for testing; more restrictive later)
4. Click "Confirm"

### 1.6 Get Connection String

1. Go back to "Databases" tab
2. Click your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<username>` with `tascade_user`
7. Replace `<password>` with your password
8. **Save this as your `MONGO_URI`**

**Example:**
```
mongodb+srv://tascade_user:MyPassword123@cluster0.abc123.mongodb.net/tascade?retryWrites=true&w=majority
```

---

## Part 2: Vercel Frontend Deployment

### 2.1 Create Vercel Account

1. Go to: https://vercel.com
2. Click "Sign Up"
3. Click "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### 2.2 Create New Project

1. Click "Add New" → "Project"
2. Find your forked `Tascade` repository
3. Click "Import"

### 2.3 Configure Project

On the configuration screen:

1. **Framework Preset:** Select "React"
2. **Root Directory:** Click "Edit" and select `frontend`
3. **Build Command:** Should auto-fill as `npm run build`
4. **Install Command:** Should auto-fill as `npm install`
5. **Output Directory:** Should auto-fill as `build`

### 2.4 Deploy

1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. You'll see "Congratulations!" when done
4. **Copy your Vercel URL** (e.g., `https://tascade.vercel.app`)

### 2.5 Add Environment Variable

1. Go to "Settings" → "Environment Variables"
2. We'll add `REACT_APP_API_URL` after deploying backend
3. For now, just note this location

---

## Part 3: Railway Backend Deployment

### 3.1 Create Railway Account

1. Go to: https://railway.app
2. Click "Sign Up"
3. Click "Continue with GitHub"
4. Authorize Railway to access your GitHub

### 3.2 Create New Project

1. Click "New Project"
2. Click "Deploy from GitHub repo"
3. Select your forked `Tascade` repository
4. Click "Deploy"

### 3.3 Configure Environment Variables

After deployment starts:

1. Click on the **Node.js** service (it will appear in your project)
2. Click the "Variables" tab
3. Add these environment variables:

| Variable | Value |
|----------|-------|
| `MONGO_URI` | Your MongoDB connection string from Part 1 |
| `JWT_SECRET` | Any random string (e.g., `secret_key_12345`) |
| `OPENROUTER_API_KEY` | Get from https://openrouter.ai |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your Vercel URL from Part 2 |

### 3.4 Complete Deployment

1. After adding all variables, Railway will automatically redeploy
2. Wait for the deployment to complete
3. Go to the "Deployments" tab
4. Click on your deployment
5. Look for your public URL (copy this!)

**Your Railway URL will look like:**
```
https://tascade-production.up.railway.app
```

---

## Part 4: Connect Frontend to Backend

### 4.1 Update Vercel Environment

1. Go to Vercel → Your Tascade project
2. Click "Settings" → "Environment Variables"
3. Click "Add New"
4. Enter:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** Your Railway URL (e.g., `https://tascade-production.up.railway.app`)
   - **Environments:** Select all (Production, Preview, Development)
5. Click "Save"

### 4.2 Vercel Auto-Redeploy

1. Vercel will automatically redeploy your frontend
2. Go to "Deployments" tab
3. Wait for the new deployment to complete
4. You'll see a green checkmark when done

---

## Part 5: Test Your Deployment

### 5.1 Open Your App

1. Go to your Vercel URL in your browser
2. You should see your Tascade app

### 5.2 Create a Test Task

1. Click "Create Task" or the add button
2. Enter a task name
3. Click "Save" or "Create"

### 5.3 Verify It Saved

1. **Refresh the page** (press F5 or Ctrl+R)
2. Your task should still be there
3. This means it saved to MongoDB! ✅

---

## Monitoring and Debugging

### View Vercel Logs

1. Go to Vercel → Your project
2. Click "Deployments" tab
3. Click on any deployment to see build logs
4. Scroll down to see build output and any errors

### View Railway Logs

1. Go to Railway → Your project
2. Click the Node.js service
3. Click "Logs" tab
4. You'll see real-time logs of your backend

### Common Error Messages

**"Cannot reach backend"**
- Check `REACT_APP_API_URL` in Vercel environment variables
- Make sure it matches your Railway URL exactly
- Check Railway logs for errors

**"MongoDB connection failed"**
- Verify `MONGO_URI` in Railway environment variables
- Check MongoDB Atlas network access settings
- Test connection string locally if possible

**"Build failed on Vercel"**
- Check Vercel deployment logs
- Usually missing dependencies or wrong file paths
- Make sure `frontend` directory exists

**"Railway deployment stuck"**
- Check Railway logs for errors
- Verify all environment variables are set
- Try redeploying by pushing a commit to GitHub

---

## Environment Variables Reference

### Backend (Railway)

```
MONGO_URI              MongoDB connection string
JWT_SECRET             Secret key for JWT tokens
OPENROUTER_API_KEY     API key for AI features
PORT                   Server port (5000)
NODE_ENV               Environment (production)
FRONTEND_URL           Frontend URL for CORS
```

### Frontend (Vercel)

```
REACT_APP_API_URL      Backend API URL
```

---

## Next Steps (Optional)

- Set up custom domain on Vercel
- Enable auto-scaling on Railway
- Set up monitoring and alerts
- Configure more restrictive MongoDB IP whitelist
- Set up CI/CD for automated testing

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://railway.app/docs
- **MongoDB Docs:** https://docs.mongodb.com
- **GitHub Actions:** https://docs.github.com/en/actions

---

## Congratulations! 🎉

Your Tascade application is now deployed and accessible to the world!

**Your Live URLs:**
- Frontend: `https://your-tascade.vercel.app`
- Backend: `https://your-tascade.up.railway.app`
- Database: MongoDB Atlas cloud

**Share your app URL with friends and family!**
