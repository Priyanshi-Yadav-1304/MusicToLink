const mongoose = require("mongoose");
const userContactModel = new mongoose.Schema({
    username:String,
    contactName:String,
    whatsAppNumber:Number,
    email:String,
})
const userContact = mongoose.model('userContact',userContactModel);
module.exports = userContact;