const Link = require('../models/linkModel');

const getLink = async(req,res) =>{
    try{
        const link = await Link.find({});
        res.status(200).send({link});
    }catch(err){
        res.status(400).send({message:err});
    }
}
module.exports = getLink;