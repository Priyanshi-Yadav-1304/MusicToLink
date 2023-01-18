var express = require('express');
var router = express.Router();
const {signUp, isPaidUser, saveDetails, getDetails, signIn, addSong, updateProfile, getAllUsers, blockUser, getUserById, validAdmin, logInMsg, LogOut, getQRCodeByUsername, verifyOtp, updateProfileWithArtistName} = require('../controllers/user-controller');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.post('/signup',signUp);
router.post('/signIn',signIn);
router.post('/onboarding',isLoggedIn,saveDetails)
router.post('/profile/:username',getDetails)
router.post('/updateProfile',isLoggedIn,updateProfile)
router.post('/updateProfileWithArtistName',updateProfileWithArtistName)
router.post('/blockUser',isLoggedIn,blockUser)
router.post('/isValidAdmin',isLoggedIn,isAdmin,validAdmin)
router.post('/addSong',isLoggedIn,addSong)
router.post('/verifyOtp',verifyOtp)

router.get('/payment',isLoggedIn,isPaidUser)
router.get('/users',isLoggedIn,getAllUsers)
router.get('/getUserById/:id',getUserById)
router.get('/isLoggedIn',isLoggedIn,logInMsg)
router.get('/logout',LogOut)
router.get('/getQRCode/:username',getQRCodeByUsername)

module.exports = router;
