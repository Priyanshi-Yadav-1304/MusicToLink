const UserContact = require('../models/userContactModel');

const saveContact = async(req,res)=>{
    try{
        const {username,contactName,email,whatsAppNumber} = req.body;
        const userContact = await UserContact.create({
            username,
            contactName,
            whatsAppNumber,
            email
        })
        res.status(200).send({userContact});
    }catch(err){
        res.status(400).send({message:err});
    }
}

module.exports ={
    saveContact,
}