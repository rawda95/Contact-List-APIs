const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-sequence')(mongoose),
    random = require('mongoose-simple-random');

Schema = mongoose.Schema;

const UserModel = new Schema({
        _id: Number,
        Authorization: {
            type: String,
            required: true,

        },
        DeviceToken: {
            type: String,
            required: true,


        },
        Name: {
            type: String,
            required: [true, 'Name is required'],

        },
        fingerPrint: {
            type: Number,
            required: true
        },


    }




);

UserModel.plugin(random);
UserModel.plugin(autoIncrement, {
    inc_field: '_id'
});
UserModel.index({ Authorization: 1, DeviceToken: 1, fingerPrint: 1 }, { unique: true });


mongoose.model('User', UserModel);