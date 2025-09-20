# WanderLust - Airbnb Clone

A full-stack web application built with Node.js, Express, MongoDB, and EJS that allows users to create, view, and manage property listings with reviews.

## Features

- User authentication (signup, login, logout)
- Create, edit, and delete property listings
- Upload images using Cloudinary
- Add and manage reviews for listings
- Responsive design with Bootstrap
- Star rating system for reviews

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- Cloudinary account for image storage

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. Make sure MongoDB is running on your local machine

## Running the Application

- Development mode: `npm run dev` (requires nodemon)
- Production mode: `npm start`

The application will be available at `http://localhost:8080`

## Usage

1. Sign up for a new account or log in
2. Create new property listings with images
3. View all listings on the main page
4. Add reviews to listings
5. Edit or delete your own listings and reviews

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with local strategy
- **File Upload**: Multer with Cloudinary storage
- **Frontend**: EJS templating, Bootstrap 5
- **Validation**: Joi
- **Session Management**: Express-session with connect-flash

## Project Structure

```
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # Express routes
├── views/          # EJS templates
├── public/         # Static assets
├── utils/          # Utility functions
├── middleware.js   # Custom middleware
├── schema.js       # Validation schemas
├── cloudConfig.js  # Cloudinary configuration
└── app.js          # Main application file
```

## Environment Variables

Make sure to set up your Cloudinary credentials in the `.env` file:

1. Sign up for a free Cloudinary account at https://cloudinary.com
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your `.env` file

## License

This project is licensed under the ISC License.
