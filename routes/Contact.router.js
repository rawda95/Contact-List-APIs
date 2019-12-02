const express = require("express"),
    ContactController = require('../controllers/Contacts.Controller');
const ContactRouter = express.Router();

ContactRouter.post('/addContact', ContactController.addNewContact);
ContactRouter.post('/getList', ContactController.FindUserContacts);
ContactRouter.post('/getRecentList', ContactController.recnetContacts);


module.exports = ContactRouter;