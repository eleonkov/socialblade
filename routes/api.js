const router = require('express').Router();
const instagramController = require('../controllers/instagram');

router.get('/', (req, res) => res.json({ status: "API Its Working" }));

router.route('/instagram')
    .post(instagramController.postAddUser)


// router.route('/contacts')
//     .get(contactController.index)
//     .post(contactController.new);

// router.route('/contacts/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete)

module.exports = router;