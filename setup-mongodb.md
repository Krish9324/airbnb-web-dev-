# MongoDB Setup Instructions

## Option 1: Quick Setup with MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string
5. Add it to your `.env` file:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
   ```

## Option 2: Install MongoDB Locally

### For Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install it
3. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```

### For macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### For Linux (Ubuntu):
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Option 3: Use Docker (if you have Docker installed)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Quick Test
After setting up MongoDB, run:
```bash
npm start
```

You should see "connected to DB" in the console.
