const mongoose = require('mongoose');

const offerModel = new mongoose.Schema({
    monthly:{
        oldPrice:Number,
        newPrice:Number,
    },
    yearly:{
        oldPrice:Number,
        newPrice:Number,
    },
    features:[],
})

const offer = mongoose.model('offer',offerModel);
module.exports = offer;