const Contact = require('../models/contactModel');

const saveContact = async(req,res)=>{
    try{
        const {username} = req.params;
        const {showEmail,heading} = req.body;
        const contact = await Contact.findOneAndUpdate({username},{
            username,
            showEmail,
            heading,
        })
        res.status(200).send({contact});
    }catch(err){
        res.status(400).send({message:err});
    }
}
const getContact = async (req,res)=>{
    try{
        const {username} = req.params;
        let contact = await Contact.findOne({username});
        if(!contact){
            contact = await Contact.create({username,heading:"Let's connect"});
        }
        res.status(200).send({contact});
    }catch(err){
        res.status(400).send({message:err});
    }
}
module.exports ={
    getContact,
    saveContact,
}