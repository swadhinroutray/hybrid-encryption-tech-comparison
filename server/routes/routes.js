const helloHandler = require('../controllers/helloHandler');
const router = require('express').Router();
const auth = require('../controllers/auth');
const fh = require('../controllers/fileHandlers/index');

const multer = require('multer');
const { getReceivedFiles } = require('../controllers/retreival');
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
router.get('/logout', isLoggedin, auth.logout);
router.get('/init', isLoggedin, auth.init);

router.post(
	'/sendfile/:encryptor',
	upload.single('file'),
	fh.readFileAndPassToEncryptor
);
router.post('/getfile/:email', fh.decryptAndDownload);
router.get('/hello', helloHandler.hello);
router.get('/recieved/:email', getReceivedFiles);

module.exports = router;
