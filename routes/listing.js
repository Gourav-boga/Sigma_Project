const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing }= require("../middeware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });





router.route("/")
.get(wrapAsync( listingController.index ))  //index route
.post(isLoggedIn,
    upload.single("listing[image][url]"), 
     validateListing,
     wrapAsync(listingController.createListing)); // create route






//new route router.get("/Listings/new",(req,res)=>{
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing),)  //Show Route
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.updateListing),//Upadte route
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing),//delete route
);




//Edit route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm),
);

//Update route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing),
// );

//Delete Route
// router.delete("/:id", 
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destroyListing),
// );

module.exports = router;