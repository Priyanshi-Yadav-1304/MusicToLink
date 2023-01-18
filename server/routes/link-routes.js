var express = require('express');
const getLink = require('../controllers/link-controller');
var linkRouter = express.Router();

linkRouter.get('/getLink',getLink);

module.exports = linkRouter;