const User = require("../models/userModel");
const Country = require("../models/countryModel");
const cloudinary = require("cloudinary");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const google = require("googleapis");
const nodemailer = require("nodemailer");
const oAuth2Client = new google.Auth.OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const signUp = async (req, res) => {
  try {
    const { email, password, longitude, latitude } = req.body;

    //check user email already exists or not
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(409).send({ message: "user email already exists" });
      return;
    }

    // //get country name from country model
    const countries = await Country.find({});
    let countryFound = {};
    countries.forEach((country) => {
      if (
        country.north >= latitude &&
        country.south <= latitude &&
        country.east >= longitude &&
        country.west <= longitude
      ) {
        countryFound = country;
      }
    });
    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await User.create({
      email,
      password,
      username: email.toLowerCase(),
      country: countryFound.name,
      otp,
    });
    await sendMail(email, otp);
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET);
    res
      .status(201)
      .cookie('token',token,{
            httpOnly:true
        })
      .send({ success: true, message: "user signed up successfully", user });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, message: err });
  }
};
async function sendMail(to, otp) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ID,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: `${process.env.EMAIL_USERNAME} <${process.env.EMAIL_ID}>`,
      to,
      subject: "Project - SignUp",
      text: "SignUp",
      html: `<h3 style="color:grey">Hello, Your OTP is ${otp} </h3>`,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp });
    if (user) {
      user.isVerified = true;
      user.otp = null;
      user.save();
      res.status(200).send({ message: "otp matched successfully", user });
    } else {
      res.status(401).send({ message: "wrong otp" });
    }
  } catch (err) {
    res.status(400).send({ message: err });
  }
};
const isPaidUser = async (req, res) => {
  try {
    const id = req.user_id;
    const user = await User.findById(id);
    if (user.isPaid) {
      res.status(200).send({ message: "paid user", success: true, user });
    } else {
      res.status(200).send({ message: "unpaid user", success: false, user });
    }
  } catch (err) {
    res.status(400).send({ message: err, success: false });
  }
};
const saveDetails = async (req, res) => {
  try {
    const { name, instaId, image, id } = req.body;

    //check artist name already exists or not
    const Users = await User.find({});
    let isUserExists = false;
    Users.forEach((user) => {
      if (
        String(user.name).toLowerCase().trim() ===
        String(name).toLowerCase().trim()
      ) {
        isUserExists = true;
      }
    });
    if (isUserExists) {
      res.status(409).send({ message: "artist name already exists" });
      return;
    }

    const username = name.split(" ").join("-").toLowerCase().trim();
    const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
      image,
      {
        folder: "musicapp",
      }
    );
    const user = await User.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        instaId,
        username,
        image: {
          public_id,
          secure_url,
        },
        onBoardingTime: new Date(),
        isOnBoarded: true,
      },
      { new: true }
    );
    res.status(200).send({ message: "profile created", success: true, user });
  } catch (err) {
    console.log({ err });
    res.status(400).send({ message: err, success: false });
  }
};
const getDetails = async (req, res) => {
  try {
    const username = req.params.username;
    let user = null;
    if (username) {
      user = await User.findOne({ username });
    }

    const token = req.cookies.token;
    let editable = false;
    const isOnBoarded = user.isOnBoarded;
    if (token) {
      const isValidToken = await jwt.verify(token, process.env.JWT_SECRET);
      if (isValidToken && isValidToken.id == user._id) {
        editable = true;
      }
    }
    res
      .status(200)
      .send({
        message: "successful",
        success: true,
        user,
        editable,
        isOnBoarded,
      });
  } catch (err) {
    res.status(400).send({ message: err, success: false });
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      if (user.isBlocked) {
        res.status(403).send({ message: "you are blocked by admin" });
      } else {
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
          })
          .send({
            message: "user signed in successfully",
            success: true,
            user,
          });
      }
    } else {
      res
        .status(401)
        .send({ message: "wrong email or password", success: false });
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: "something went wrong...", err, success: false });
  }
};
const LogOut = async (req, res) => {
  try {
    res.clearCookie("token").status(200).send({ message: "logged out" });
  } catch (err) {
    res.send({ message: err });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { username, image, about, profession, instaId, service, latestSong } =
      req.body;
    const user = await User.findOne({username});
    let newImage = { public_id:'', secure_url:''};
    if(image){
      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
          image,
          {
              folder: "new_musicapp",
          }
          );
          newImage ={
            public_id,
            secure_url
          }
      }
    const updatedUser = await user.update({
      about,
      profession,
      instaId,
      image: newImage,
      latestSong,
      profileLinks: service,
      isOnBoarded:true,
    },{new:true});
    res.status(200).send({ message: "successful", success: true});
  } catch (err) {
    console.log({ err });
    res.status(400).send({ message: err, success: false });
  }
};
const updateProfileWithArtistName = async (req, res) => {
  try {
    const { name, id, image, about, profession, instaId, service, latestSong } =
      req.body;
    const user = await User.findById(id);
    const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
        image,
        {
            folder: "new_musicapp",
        }
        );
        const newImage = { public_id, secure_url };
        const username = name.split(" ").join("-").toLowerCase().trim();
    const updatedUser = await user.update({
      name,
      about,
      profession,
      instaId,
      image: newImage,
      latestSong,
      profileLinks: service,
      isOnBoarded:true,
      username,
    });
    res.status(200).send({ message: "successful", success: true, username});
  } catch (err) {
    console.log({ err });
    res.status(400).send({ message: err, success: false });
  }
};

const addSong = async (req, res) => {
  try {
    const { data } = req.body;
    res.send({ data });
  } catch (err) {
    res.status(400).send({ message: err, success: false });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};
const blockUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await User.findByIdAndUpdate(user_id, {
      isBlocked: true,
    });
    res.status(200).send({ message: "user blocked", user });
  } catch (err) {
    console.log({ err });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send({ message: "user found", user });
  } catch (err) {
    console.log({ err });
    res.status(400).send({ message: err });
  }
};
const validAdmin = (req, res) => {
  res.status(200).send({ message: "ok", success: true });
};
const logInMsg = (req, res) => {
  res.status(200).send({ isLoggedIn: true });
};
const getQRCodeByUsername = async (req, res) => {
  try {
    let { username } = req.params;
    username.split("-").join("");
    const user = await User.findOne({ username });
    res.status(200).send({ user });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};
module.exports = {
  signUp,
  isPaidUser,
  saveDetails,
  getDetails,
  signIn,
  updateProfile,
  addSong,
  getAllUsers,
  blockUser,
  getUserById,
  validAdmin,
  logInMsg,
  LogOut,
  getQRCodeByUsername,
  verifyOtp,
  updateProfileWithArtistName,
};
