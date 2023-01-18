const mongoose = require("mongoose");
const contactModel = new mongoose.Schema({
    username:String,
    heading:String,
    showEmail:{
        type:Boolean,
        default:true,
    },
})
const contact = mongoose.model('contact',contactModel);
module.exports = contact;