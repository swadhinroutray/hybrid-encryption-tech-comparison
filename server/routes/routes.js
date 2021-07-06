const helloHandler = require('../controllers/helloHandler');
const AESHandler = require('../controllers/aesGenerator');
const router = require('express').Router();
const auth = require('../controllers/auth');
const fh = require('../controllers/fileHandlers/index');

const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

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

router.post(
	'/sendfile/:encryptor',
	isLoggedin,
	upload.array('files'),
	fh.readFileAndPassToEncryptor
);
router.post('/getfile', isLoggedin, fh.decryptAndDownload);
router.get('/hello', helloHandler.hello);
router.post('/gen', AESHandler.GenKeys);
router.post('/get', AESHandler.GetKeys);

module.exports = router;
