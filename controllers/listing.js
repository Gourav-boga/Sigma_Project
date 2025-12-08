const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN; // Ensure your token is loaded from a .env file
// const geocoder = mbxGeocoding({ accessToken: mapToken }); 


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req,res)=>{
    // console.log(req.user);
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path:"reviews",
    populate:{
      path:"author",

    },
  })
  .populate("owner");
  if(!listing){
    req.flash("error","Listing You Requested for does not exist!");
    res.redirect("/listings");
  }
  //console.log(listing);
  res.render("listings/show.ejs", { listing });
  
};


module.exports.createListing = async (req,res,next)=>{
 let response  = await geocodingClient
 .forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
.send()

// module.exports.createListing = async (req, res, next) => {
//     // This is where you use the initialized 'geocoder'
//     const geocodingResponse = await geocoder.forwardGeocode({ 
//         query: req.body.listing.location, 
//         limit: 1 ,
//     }).send();

//     // ... save logic ...






  const { path, filename } = req.file;

    //console.log(url,"---",filename);
    const newListing = new Listing(req.body.listing);
    newListing.image = {
    url: path,
    filename: filename
    };
    
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;
    let savedlist = await newListing.save();
    // console.log(savedlist);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");    

};

// Example in your POST /listings route handler (Controller or Router)

// Example in your POST /listings route handler (Controller or Router)

// module.exports.createListing = async (req, res, next) => {
    
//     // --- Geocoding Logic (Assumed to be fixed now) ---
//     const locationQuery = req.body.listing.location; 
//     const geocodingResponse = await geocoder.forwardGeocode({ 
//         query: locationQuery, 
//         limit: 1 
//     }).send();
//     // ----------------------------------------------------
    
//     const newListing = new Listing(req.body.listing);
    
//     // 🚩 CRITICAL FIX: Set the owner ID before saving
//     if (req.user && req.user._id) {
//         newListing.owner = req.user._id; // <-- Assign the current user's ID
//     } else {
//         // Handle case where user is not logged in (e.g., if you don't use middleware)
//         console.error("User not authenticated to create listing.");
//         req.flash("error", "You must be logged in to create a listing.");
//         return res.redirect("/login");
//     }

//     newListing.geometry = geocodingResponse.body.features[0].geometry;
    
//     await newListing.save();

//     req.flash("success", "New Listing Created!");
//     res.redirect(`/listings/${newListing._id}`);
// };


module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
     req.flash("error","Listing you requested for does not exist!");
    res.redirect("/listings");
    };
    let originalImageUrl = listing.image.url;
    originalUrl = originalImageUrl.replace("/upload/","/upload/w_250/");
    res.render("listings/edit.ejs",{ listing ,originalImageUrl });
};


module.exports.updateListing = async(req,res)=>{
        let{id} = req.params;
        let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing });

        if(typeof req.file !== "undefined"){
        const { path, filename } = req.file;
        listing.image = {
          url: path,
          filename: filename
        };
        await listing.save();
       }

        req.flash("success","Listing Updated!");
        res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let { id }=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
     req.flash("success"," Listing Deleted!");
    console.log(deletedListing);
    res.redirect("/listings");

};