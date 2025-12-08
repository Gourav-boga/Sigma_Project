const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middeware.js");

const userController = require("../controllers/user.js");


router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup)
);

<<<<<<< HEAD
=======
// router.get("/signup", userController.renderSignupForm);

// //signup user post
// router.post(
//     "/signup", 
//     wrapAsync(userController.signup)
// );
>>>>>>> 2efc7911e8e01580b5a6270dff684d6dcdc4da96

//login user

router.route("/login")
.get( userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login' , 
        failureFlash: true, }),
        userController.login
    );



<<<<<<< HEAD

=======
// router.get("/login", userController.renderLoginForm);

// router.post("/login",saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect: '/login' , 
//         failureFlash: true, }),
//         userController.login
//     );
>>>>>>> 2efc7911e8e01580b5a6270dff684d6dcdc4da96

//logout 
router.get("/logout", userController.logout);

module.exports = router;