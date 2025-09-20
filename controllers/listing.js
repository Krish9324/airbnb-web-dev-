const Listing = require("../models/listing");

module.exports.index = async (req,res) => {
  const allListings = await Listing.find({});
  res.render("listings/index",{allListings});
};

module.exports.renderNewForm = (req,res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",           // populate reviews first
      populate: {
        path: "author",          // then inside each review, populate author
        model: "User"
      }
    })
    .populate("owner");          // also populate listing owner

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};


module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  
  // Handle image upload
  if (req.file) {
    // For local storage, use the filename; for Cloudinary, use the path (URL)
    newListing.image = req.file.path || `/uploads/${req.file.filename}`;
  }
  
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req,res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error","Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit",{listing}); 
};

module.exports.updateListing = async (req,res) => {
  let {id} = req.params;
  const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
  
  // Handle image upload
  if (req.file) {
    // For local storage, use the filename; for Cloudinary, use the path (URL)
    listing.image = req.file.path || `/uploads/${req.file.filename}`;
    await listing.save();
  }
  
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res) => {
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
