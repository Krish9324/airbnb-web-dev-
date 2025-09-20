// Fallback in-memory database for development when MongoDB is not available
// This is only for testing purposes

class InMemoryDB {
    constructor() {
        this.listings = [];
        this.users = [];
        this.reviews = [];
        this.nextId = 1;
    }

    // User operations
    createUser(userData) {
        const user = {
            _id: this.nextId++,
            username: userData.username,
            email: userData.email,
            ...userData
        };
        this.users.push(user);
        return user;
    }

    findUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    // Listing operations
    createListing(listingData) {
        const listing = {
            _id: this.nextId++,
            ...listingData,
            reviews: [],
            createdAt: new Date()
        };
        this.listings.push(listing);
        return listing;
    }

    findListings() {
        return this.listings;
    }

    findListingById(id) {
        return this.listings.find(listing => listing._id == id);
    }

    updateListing(id, updateData) {
        const index = this.listings.findIndex(listing => listing._id == id);
        if (index !== -1) {
            this.listings[index] = { ...this.listings[index], ...updateData };
            return this.listings[index];
        }
        return null;
    }

    deleteListing(id) {
        const index = this.listings.findIndex(listing => listing._id == id);
        if (index !== -1) {
            return this.listings.splice(index, 1)[0];
        }
        return null;
    }

    // Review operations
    createReview(reviewData) {
        const review = {
            _id: this.nextId++,
            ...reviewData,
            createdAt: new Date()
        };
        this.reviews.push(review);
        return review;
    }

    findReviewById(id) {
        return this.reviews.find(review => review._id == id);
    }

    deleteReview(id) {
        const index = this.reviews.findIndex(review => review._id == id);
        if (index !== -1) {
            return this.reviews.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = new InMemoryDB();
