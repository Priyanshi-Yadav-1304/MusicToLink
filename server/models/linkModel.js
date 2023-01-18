const mongoose = require("mongoose");

const linkModel = new mongoose.Schema({
    link:String,
})
const link = mongoose.model('link',linkModel);
module.exports = link;