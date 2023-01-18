var express = require('express');
const { getContact, saveContact } = require('../controllers/contact-controller');
var contactRouter = express.Router();

contactRouter.get('/getContact/:username',getContact);
contactRouter.post('/saveContact/:username',saveContact);

module.exports = contactRouter;