const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing }= require("../middeware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("../schema.js");



// const validateListing = (req,res,next) =>{
//     let{error} = listingSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");       
//             throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// };


router.route("/")
.get(wrapAsync( listingController.index ))  //index route
.post(isLoggedIn,
    upload.single("listing[image][url]"), 
     validateListing,
     wrapAsync(listingController.createListing)); // create route
// .post(upload.single("listing[image]{url}"),(req,res)=>{
//     res.send(req.file);
// })





//Index Route
// router.get("/",
//     wrapAsync( listingController.index )
// );

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



// //Show Route
// router.get("/:id", 
//     wrapAsync(listingController.showListing),
// );


// // Create route
// router.post("/",
//       isLoggedIn,
//      validateListing,
//      wrapAsync(listingController.createListing),);

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