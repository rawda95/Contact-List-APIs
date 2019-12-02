// require('./Models/User');
// const mongoose = require('mongoose');


// const UserSchema = mongoose.model('User');


// const CreateUsers = async() => {

//     UserA = new UserSchema({
//         authorization: 'dsdsdsdsddsds',
//         deviceToken: 'daasasasassa',
//         fingerPrint: '12345678',
//         name: 'user A'
//     });

//     await UserA.save();
//     UserB = new UserSchema({
//         authorization: 'dsdsdsdsddsds',
//         deviceToken: 'usedadasadadsaccc',
//         fingerPrint: '128121',
//         name: 'user B'
//     });

//     await UserB.save();


// }

var users = [{
        authorization: 'ff3455552vsddqlq12139182jnfjdur2bvvlaoqueffnv1f1fdj33de3232',
        deviceToken: '0b0c9653281jdnkak22mdlsyeh12b6egfheu3',
        fingerPrint: '12345678',
        name: 'user A',
        id: 1
    },
    {
        authorization: '123jshw78ahs9dhe72hdwjew6dgbw2j1bf6dy3h28fhdd2',
        deviceToken: 'he72hdwjew6dgbw2j1bf6dklq12121o9344834uj',
        fingerPrint: '234212',
        name: 'user B',
        id: 2
    }
];

module.exports = users;