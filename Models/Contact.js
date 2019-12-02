const mongoose = require('mongoose'),


    Schema = mongoose.Schema;

const ContactModel = new Schema({

        Email: {
            type: String,
            unique: true,
            validate: function(email) {
                return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
            }
        },
        Mobile: {
            type: String,
            required: true,
            unique: true

        },
        FirstName: {
            type: String,
            required: true
        },

        LastName: {
            type: String,
            required: true
        },
        CreatedAt: {
            type: Date
        },
        User: {
            type: Number
        }

    }




);



mongoose.model('Contact', ContactModel);