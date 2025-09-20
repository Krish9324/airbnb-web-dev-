const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


// Use MongoDB Atlas or local MongoDB
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("connected to DB");
}


app.set ("view engine","ejs");
app.set ("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    },
};

app.get("/", (req,res) => {
    res.redirect("/listings");
});


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    const message = err.message || "Something went wrong!";
    res.status(statusCode).render("error.ejs", { message });
});


// Start server with fallback database option
main().then(() => {
    console.log("✅ MongoDB Connected");
    startServer("MongoDB Connected");
}).catch((err) => {
    console.log("⚠️  MongoDB connection failed, using fallback mode");
    console.log("📝 To use full functionality, please set up MongoDB Atlas:");
    console.log("   1. Run: node quick-setup.js");
    console.log("   2. Follow the instructions to set up MongoDB Atlas");
    console.log("   3. Add your MONGO_URL to .env file");
    console.log("");
    console.log("🚀 Starting server in fallback mode...");
    startServer("Fallback Mode");
});

function startServer(mode) {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log("✅ Server is listening to port", PORT);
        console.log("🌐 Visit: http://localhost:" + PORT);
        console.log(`📊 Database: ${mode}`);
        if (mode === "Fallback Mode") {
            console.log("⚠️  Note: Some features may not work without MongoDB");
        }
    });
}

// Export for Vercel
module.exports = app;