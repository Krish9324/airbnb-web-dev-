require('dotenv').config();  // ensures env variables exist even if cloudConfig.js is required first
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Check if Cloudinary credentials are available
const hasCloudinaryConfig = process.env.CLOUD_NAME && process.env.CLOUD_API_KEY && process.env.CLOUD_API_SECRET;

let storage;

if (hasCloudinaryConfig) {
  // Use Cloudinary if credentials are available
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });

  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats: ['png', 'jpg', 'jpeg']
    }
  });
} else {
  // Fallback to local storage when Cloudinary is not configured
  console.log('⚠️  Cloudinary not configured, using local file storage');
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
}

module.exports = { cloudinary, storage };
