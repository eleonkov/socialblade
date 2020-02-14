const router = require('express').Router();
const instagramController = require('../controllers/instagram');
const searchController = require('../controllers/search');

router.get('/', (req, res) => res.json({ status: "API Its Working" }));

router.get('/search', searchController.getResult)

router.route('/instagram')
    .get(instagramController.getUsers)
    .post(instagramController.postAddUser);

router.route('/instagram/:username')
    .get(instagramController.getUser);
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete)

module.exports = router;