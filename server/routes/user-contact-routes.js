var express = require('express');
const { saveContact } = require('../controllers/user-contact-controller');
var userContactRouter = express.Router();

userContactRouter.post('/saveContactDetails',saveContact);

module.exports = userContactRouter;