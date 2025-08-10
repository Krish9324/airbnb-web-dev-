const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema =  new Schema( {
    title :  {
        type :String,
        required: true,
    },

    description: String,
    image: {
        type: String,
    default: 
    " https://tse3.mm.bing.net/th/id/OIP.TY--ZbX7huG_EgXy7z8T-QHaEo?pid=Api&P=0&h=220k",    
        set: (v) => v === ""? "default https://tse3.mm.bing.net/th/id/OIP.TY--ZbX7huG_EgXy7z8T-QHaEo?pid=Api&P=0&h=220k": v,
    },
    price: Number,
    location: String,
    country: String, 
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;