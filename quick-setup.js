// Quick setup script for MongoDB Atlas
// This script will help you get a MongoDB connection string

console.log(`
🚀 QUICK MONGODB ATLAS SETUP
============================

1. Go to: https://www.mongodb.com/atlas
2. Click "Try Free" and create an account
3. Create a new project (name it anything)
4. Create a new cluster (choose FREE tier)
5. Create a database user:
   - Username: wanderlust_user
   - Password: (create a strong password)
6. Add your IP address (or 0.0.0.0/0 for all IPs)
7. Click "Connect" → "Connect your application"
8. Copy the connection string
9. Replace <password> with your actual password
10. Add this to your .env file:

MONGO_URL=mongodb+srv://wanderlust_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority

Then run: npm start

Need help? Check setup-mongodb.md for detailed instructions.
`);

// Check if .env file exists
const fs = require('fs');
if (!fs.existsSync('.env')) {
    console.log(`
⚠️  .env file not found!
Creating a template .env file for you...
`);
    
    const envContent = `# MongoDB Configuration
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust

# Cloudinary Configuration (for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
`;
    
    fs.writeFileSync('.env', envContent);
    console.log('✅ .env file created! Please update it with your actual credentials.');
}
