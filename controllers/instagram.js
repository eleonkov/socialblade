
const User = require('../models/user');
const Statistics = require('../models/statistics');

const getIGUserData = require('../util/get-resource');

exports.postAddUser = async (req, res) => {
    const username = req.body.username.trim();

    try {
        const userData = await getIGUserData(username);

        const user = new User({ username });
        const statistics = new Statistics({
            user_id: user._id,
            timestamp: Date.now(),
            followers: userData.followers
        });

        const tmpUser = await user.save();
        const tmpStatistics = await statistics.save();

        Promise.all([tmpUser, tmpStatistics])
            .then(() => {
                return res.status(201).json({
                    message: 'New user created!'
                });
            })
    } catch (err) {
        res.send(err);
    }
};


// exports.index = (req, res) => {
//     Contact.get((err, contacts) => {
//         if (err) {
//             res.json({
//                 status: "error",
//                 message: err
//             });
//         } else {
//             res.json({
//                 status: "success",
//                 message: "Contacts retrieved successfully",
//                 data: contacts
//             });
//         }
//     });
// };



// exports.view = function (req, res) {
//     Contact.findById(req.params.contact_id, (err, contact) => {
//         if (err) res.send(err);

//         res.json({
//             message: 'Contact details loading..',
//             data: contact
//         });
//     });
// };

// exports.update = function (req, res) {
//     Contact.findById(req.params.contact_id, function (err, contact) {
//         if (err) res.send(err);

//         contact.name = req.body.name ? req.body.name : contact.name;
//         contact.gender = req.body.gender;
//         contact.email = req.body.email;
//         contact.phone = req.body.phone;

//         contact.save((err) => {
//             if (err) res.json(err);

//             res.json({
//                 message: 'Contact Info updated',
//                 data: contact
//             });
//         });
//     });
// };

// exports.delete = function (req, res) {
//     Contact.remove({
//         _id: req.params.contact_id
//     }, (err, contact) => {
//         if (err) res.send(err);

//         res.json({
//             status: "success",
//             message: 'Contact deleted'
//         });
//     });
// };