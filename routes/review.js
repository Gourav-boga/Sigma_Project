const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
<<<<<<< HEAD
const ExpressError = require("../utils/ExpressError.js");
const {  reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
=======
//const ExpressError = require("../utils/ExpressError.js");
//const {  reviewSchema } = require("../schema.js");
//const Review = require("../models/review.js");
//const Listing = require("../models/listing.js");
>>>>>>> 2efc7911e8e01580b5a6270dff684d6dcdc4da96
const {validateReview, isLoggedIn,isReviewAuthor}  = require("../middeware.js");
const reviewController = require("../controllers/review.js");


<<<<<<< HEAD

=======
// const validateReview = (req,res,next) =>{
//     let{error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");       
//             throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// };
>>>>>>> 2efc7911e8e01580b5a6270dff684d6dcdc4da96



//Reviews
//POST Review Route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview),
);


//Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview),
);

module.exports = router;