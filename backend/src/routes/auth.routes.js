const { Router } = require('express');
const controller = require('../controllers/authController');
const requireAuth = require('../middlewares/requireAuth');

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', requireAuth, controller.logout);

module.exports = router;