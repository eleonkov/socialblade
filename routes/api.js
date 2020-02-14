const router = require('express').Router();
const instagramController = require('../controllers/instagram');

router.get('/', (req, res) => res.json({ status: "API Its Working" }));

router.route('/instagram')
    .get(instagramController.getUsers)
    .post(instagramController.postAddUser);

router.route('/instagram/:username')
    .get(instagramController.getUser);
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete)

module.exports = router;