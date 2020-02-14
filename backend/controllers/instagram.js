const User = require('../models/user');
const getIGUserData = require('../util/get-resource');

exports.getUser = async (req, res) => {
    const { username } = req.params;
    const results = await User.find({ username }) || [];

    return res.status(201).json({ results });
}

exports.getUsers = async (req, res) => {
    const account_type = 'instagram';
    const results = await User.find({ account_type }).limit(10) || [];

    return res.status(201).json({ results });
}

exports.postAddUser = async (req, res) => {
    const username = req.body.username.trim();

    const results = await User.find({ username });

    if (results.length !== 0) {
        return res.status(201).json({
            detail: 'Such a user already exists!'
        });
    }

    try {
        const userData = await getIGUserData(username);

        if (userData.is_private) {
            return res.status(201).json({
                detail: 'We do not work with private accounts!'
            });
        }

        const user = new User({
            account_type: 'instagram',
            username: userData.username,
            last_update: Date.now()
        });

        user.save().then(() => res.status(201).json({
            detail: 'success'
        }))
    } catch (err) {
        return res.status(201).json({
            detail: 'Something went wrong, check your username or try again later!'
        })
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