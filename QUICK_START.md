# 🚀 Quick Start - Deploy Tascade in 5 Minutes

## Step 1: MongoDB Atlas (2 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a new project
4. Create a free M0 cluster
5. Go to "Database Access" → Click "Add New Database User"
   - Username: `tascade_user`
   - Password: (generate a secure password, save it!)
6. Go to "Network Access" → Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for testing)
7. Go to "Databases" → Click your cluster → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
8. **Save this as your `MONGO_URI`**

Example: `mongodb+srv://tascade_user:password123@cluster0.xxxxx.mongodb.net/tascade?retryWrites=true&w=majority`

---

## Step 2: Deploy Frontend to Vercel (1 minute)

1. Go to: https://vercel.com
2. Click "Sign Up" → Sign in with GitHub
3. Click "Add New" → "Project"
4. Find and select your forked Tascade repository
5. Configure:
   - **Framework Preset:** React
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. **Copy your Vercel URL** (looks like: `https://tascade.vercel.app`)

---

## Step 3: Deploy Backend to Railway (1 minute)

1. Go to: https://railway.app
2. Click "Sign Up" → Sign in with GitHub
3. Click "New Project"
4. Click "Deploy from GitHub repo"
5. Select your forked Tascade repository
6. Railway will start deploying
7. Go to your project → Click the Node.js service
8. Click "Variables" tab
9. Add these environment variables:
   - `MONGO_URI` = your connection string from Step 1
   - `JWT_SECRET` = any random string (e.g., `abc123xyz789`)
   - `OPENROUTER_API_KEY` = get from https://openrouter.ai
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = your Vercel URL from Step 2
10. Click "Deploy"
11. **Copy your Railway URL** (looks like: `https://tascade-production.up.railway.app`)

---

## Step 4: Connect Frontend to Backend (1 minute)

1. Go back to Vercel → Your project → Click "Settings"
2. Click "Environment Variables"
3. Add a new variable:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** your Railway URL from Step 3 (e.g., `https://tascade-production.up.railway.app`)
4. Click "Save"
5. Vercel will automatically redeploy with the new environment variable

---

## ✅ Done! Your App is Live! 🎉

### Test it:
1. Open your Vercel URL in your browser
2. Try creating a new task
3. Refresh the page
4. If the task is still there → **Success!** ✅

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to backend" | Check that `REACT_APP_API_URL` is correct in Vercel |
| "MongoDB connection error" | Verify `MONGO_URI` is correct in Railway environment |
| "Vercel build fails" | Check build logs in Vercel dashboard |
| "Railway deployment stuck" | Check logs in Railway dashboard |

---

## 📚 For More Details

See: **DEPLOYMENT_GUIDE.md**

**Congratulations! You've deployed Tascade! 🚀**
