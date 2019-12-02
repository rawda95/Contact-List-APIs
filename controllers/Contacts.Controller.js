const mongoose = require('mongoose');

require('../Models/Contact');

ContactSchema = mongoose.model('Contact');

var users = require('../config');


const addNewContact = async(req, res) => {


    let authorization = req.body.authorization,
        deviceToken = req.body.deviceToken,
        fingerPrint = req.body.fingerPrint,
        email = req.body.email,
        mobile = req.body.mobile,
        firstName = req.body.firstName,
        lastName = req.body.lastName;


    // validation on input 
    let IsError = false;
    let ErrorList = [];

    let inputValidtionResult = UserInputValidation(authorization, deviceToken, fingerPrint);
    IsError = inputValidtionResult.IsError;
    ErrorList = inputValidtionResult.ErrorList;
    if (email == null) {
        if (!IsError) {
            IsError = true;
        }

        ErrorList.push("email is required");
    } else {
        const regEmail = /\S+@\S+\.\S+/;
        IsEmailValid = regEmail.test(email);
        if (!IsEmailValid) {
            if (!IsError) {
                IsError = true;
            }

            ErrorList.push("invalid email.");
        }
    }

    if (mobile == null) {

        if (!IsError) {
            IsError = true;
        }

        ErrorList.push("mobile is required");
    }
    if (firstName == null) {


        if (!IsError) {
            IsError = true;
        }

        ErrorList.push("firstName is required");
    }
    if (lastName == null) {
        if (!IsError) {
            IsError = true;
        }

        ErrorList.push("lastName is required");

    }


    if (IsError) {
        return res.status(400).send({
            error: ErrorList
        });
    }

    // user authorize 
    var User = getUser(authorization, deviceToken, fingerPrint);
    if (User == undefined) {
        return res.status(401).send({
            error: "unauthorized"
        });
    }


    var ContactWithThisEmail = await ContactSchema.find({ User: User.id, Email: email });
    if (ContactWithThisEmail.length != 0) {
        return res.status(400).send({
            error: "This email address is already used by another contact."
        });
    }
    var ContactWithThisMobile = await ContactSchema.find({ User: User.id, Mobile: mobile });
    if (ContactWithThisMobile.length != 0) {
        return res.status(400).send({
            error: "This mobile is already used by another contact."
        });
    }
    // create the contact 
    let Contact = new ContactSchema({
        Email: email,
        Mobile: mobile,
        FirstName: firstName,
        LastName: lastName,
        User: User.id,
        CreatedAt: new Date()

    });
    try {

        await Contact.save();

        return res.status(200).send({
            data: {
                email: Contact.Email,
                accountId: Contact._id,
                userId: Contact.User,
                firstName: Contact.FirstName,
                lastName: Contact.LastName,
                mobileNumber: Contact.Mobile
            }

        });

    } catch (err) {
        return res.status(500).send({
            error: err.message
        });

    }



};

const FindUserContacts = async(req, res) => {
    let authorization = req.body.authorization,
        deviceToken = req.body.deviceToken,
        fingerPrint = req.body.fingerPrint,
        pageNum = parseInt(req.body.pageNum);



    //input validation
    let IsError = false;
    let ErrorList = [];

    let inputValidtionResult = UserInputValidation(authorization, deviceToken, fingerPrint);
    IsError = inputValidtionResult.IsError;
    ErrorList = inputValidtionResult.ErrorList;




    if (pageNum < 0 || pageNum === 0) {
        IsError = true;
        ErrorList.push("invalid page number, should start with 1");
    }


    if (IsError) {
        return res.status(400).send({
            error: ErrorList
        });
    }


    var User = getUser(authorization, deviceToken, fingerPrint);
    if (User == undefined) {
        return res.status(401).send({
            error: "unauthorized"
        });
    }

    //page size 
    let size = 3;
    let query = {};

    query.skip = size * (pageNum - 1)
    query.limit = size
    query.sort = "-CreatedAt"
        // Find Contacts
    try {
        let contacts = await ContactSchema.find({ User: User.id }, {}, query);

        let data = contacts.map((contact) => {
            return {
                createdAt: contact.CreatedAt,
                firstName: contact.FirstName,
                lastName: contact.LastName,
                userId: contact.User,
                contactId: contact._id,
                mobileNumber: contact.Mobile,
                email: contact.Email

            }

        });
        return res.status(200).send({
            data: data

        });




    } catch (err) {
        return res.status(500).send({
            error: err.message
        });

    }



};

const recnetContacts = async(req, res, next) => {
    let authorization = req.body.authorization,
        deviceToken = req.body.deviceToken,
        fingerPrint = req.body.fingerPrint;


    let IsError = false;
    let ErrorList = [];

    let inputValidtionResult = UserInputValidation(authorization, deviceToken, fingerPrint);
    IsError = inputValidtionResult.IsError;
    ErrorList = inputValidtionResult.ErrorList;

    if (IsError) {
        return res.status(400).send({
            error: ErrorList
        });
    }
    var User = getUser(authorization, deviceToken, fingerPrint);
    if (User == undefined) {
        return res.status(401).send({
            error: "unauthorized"
        });
    }

    try {
        var contacts = await ContactSchema.find({ User: User.id })
            .sort('-CreatedAt')
            .limit(10)


        var data = contacts.map((contact) => {
            return {
                created_ts: contact.CreatedAt,
                userId: contact.User,
                email: contact.Email,
                firstName: contact.FirstName,
                lastName: contact.LastName,
                mobileNumber: contact.Mobile
            }

        });
        return res.status(200).send({
            data: data

        });

    } catch (err) {

        return res.status(500).send({
            error: err.message
        });

    }




};





















const getUser = (authorization, deviceToken, fingerPrint) => {


    return users.filter((user) => {
        return (user.authorization == authorization && user.deviceToken == deviceToken && user.fingerPrint == fingerPrint);
    })[0];

}

const UserInputValidation = (authorization, deviceToken, fingerPrint) => {
    let IsError = false;
    let ErrorList = [];


    if (authorization == null) {
        IsError = true;
        ErrorList.push("authorization is required");
    }
    if (deviceToken == null) {
        IsError = true;
        ErrorList.push("deviceToken is required");
    }
    if (fingerPrint == null) {
        IsError = true;
        ErrorList.push("fingerPrint is required");
    }

    return { IsError: IsError, ErrorList: ErrorList };

}

module.exports = {
    addNewContact,
    FindUserContacts,
    recnetContacts,


};