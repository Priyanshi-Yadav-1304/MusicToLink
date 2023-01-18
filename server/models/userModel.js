const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
    name:{
        type:String,
        unique: true,
    },
    username:String,
    password:String,
    isPaid:{
        type:Boolean,
        default:false,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    instaId:String,
    image:{
        public_id:String,
        secure_url:String,
    },
    about:String,
    profession:String,
    onBoardingTime:Date,
    profileLinks:[{
        image_url:String,
        song_url:String,
        service_id:String,
    }],
    isOnBoarded:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    latestSong:{
        type:String,
        default:'',
    },
    country:{
        type:String,
        default:"Unknown",
    },
    otp:{
        type:Number,
    },
    isVerified:{
        default:false,
        type:Boolean,
    }
},{timestamps:true})
userModel.index( { "otp": 1 }, { expireAfterSeconds: 0 } );
const user = mongoose.model("user",userModel);
module.exports = user;
