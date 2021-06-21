const helloHandler = require('../controllers/helloHandler');
const AESHandler = require('../controllers/aesGenerator');
const router = require('express').Router();
const auth = require('../controllers/auth');

function isLoggedin(req, res, next) {
	if (req.session) {
		if (req.session.logged_in == true) {
			next();
		} else {
			return res.send({ success: true, data: 'User Not Logged in' });
		}
	} else {
		return res.send({ success: true, data: 'User Not Logged in' });
	}
}
//* Auth Routes
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', isLoggedin, auth.logout);

router.get('/hello', helloHandler.hello);
router.post('/gen', AESHandler.GenKeys);
router.post('/get', AESHandler.GetKeys);

module.exports = router;
