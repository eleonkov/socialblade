const User = require('../models/user');
const getIGUserData = require('../util/get-resource');

exports.getUsers = async (req, res) => {
    const user = await User.find({ account_type: 'instagram' }).limit(10);

    if (user.length !== 0) {
        return res.status(201).json(user);
    }
}

exports.postAddUser = async (req, res) => {
    const username = req.body.username.trim();

    const currentUser = await User.find({ username });

    if (currentUser.length !== 0) {
        return res.status(201).json({
            message: 'Such a user already exists!'
        });
    }

    try {
        const userData = await getIGUserData(username);

        if (userData.is_private) {
            return res.status(201).json({
                message: 'We do not work with private accounts!'
            });
        }

        const user = new User({
            account_type: 'instagram',
            username: userData.username,
            last_update: Date.now()
        });

        user.save().then(() => res.status(201).json({
            message: 'New user created!'
        }))
    } catch (err) {
        return res.status(201).json({
            message: 'Something went wrong, check your username or try again later!'
        })
    }
};

exports.getUser = async (req, res) => {
    const user = await User.find({ username: req.params.username });

    if (user.length !== 0) {
        return res.status(201).json(user);
    }

    return res.status(201).json([]);
}

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