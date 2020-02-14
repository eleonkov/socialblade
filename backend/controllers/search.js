const User = require('../models/user');

exports.getResult = async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(201).json({
            message: "Not found!"
        })
    }

    const users = await User.find({ username: q })

    if (users.length !== 0) {
        return res.status(201).json({ users });
    }

    return res.status(201).json({
        message: "Not found!"
    })
}