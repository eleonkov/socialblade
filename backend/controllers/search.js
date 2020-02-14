const User = require('../models/user');

exports.getResult = async (req, res) => {
    const { q: username } = req.query;

    if (!username) {
        return res.status(201).json({
            message: "Missing q parameter!"
        });
    }

    const results = await User.find({ username }) || [];

    return res.status(201).json({ results });
}