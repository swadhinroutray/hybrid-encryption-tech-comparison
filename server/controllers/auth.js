const bcrypt = require('bcryptjs');
const { user } = require('../models/userModel');
const { uuid } = require('uuidv4');
const { sendError, sendResponse } = require('../utils/responseHandler');
const keypair = require('keypair');

async function register(req, res) {
	try {
		const salt = await bcrypt.genSalt(parseInt(process.env.SALT_FACTOR));
		bcrypt.hash(req.body.password, salt).then(async (hash) => {
			var pair = await keypair({ bits: 1024 }); //! Change keypair OPTS in order to vary key size as and when required

			const newUser = new user({
				userID: uuid(),
				name: req.body.name.trim(),
				email: req.body.email.trim(),
				password: hash,
				contact: req.body.contact.trim(),
				RSAPrivateKey: pair.private,
				RSAPublicKey: pair.public,
				receivedFiles: [],
			});

			var result = await newUser.save();
			if (!result) {
				console.log(e);
				return sendError(res, 'An error Occured');
			}
			//   console.log(result);
			return sendResponse(res, 'User Registered Successfully');
		});
	} catch (e) {
		console.log(e);
		return sendError(res, e);
	}
}
async function login(req, res) {
	try {
		// console.log(req.session)
		console.log(req.body);
		if (req.session.logged_in == undefined || !req.session.logged_in) {
			result = await user.findOne({ email: req.body.email.trim() });
			// console.log(result)

			if (!result) return sendResponse(res, 'Invalid Credentials');
			else if (result.length == 0)
				return sendResponse(res, 'Invalid Credentials');
			else {
				resultVal = await bcrypt.compare(
					req.body.password,
					result.password
				);

				if (!resultVal) return sendResponse(res, 'Invalid Passowrd');
				else {
					req.session.email = req.body.email;
					req.session.name = result.name;
					req.session.logged_in = true;
					const obj = {
						name: result.name,
						email: result.email,
						contact: result.contact,
					};
					req.session.save(() => {
						return sendResponse(res, obj);
					});
				}
			}
		} else {
			console.log(req.session);
			return sendResponse(res, 'Already Logged In');
		}
	} catch (e) {
		console.log(e);
		return sendResponse(res, e);
	}
}

async function logout(req, res) {
	// console.log(req.session);

	await req.session.destroy();
	console.log(req.session);
	return sendResponse(res, 'Logged Out Successfully');
}

async function init(req, res) {
	try {
		result = await user.findOne({
			email: req.session.email,
		});
		if (!result) {
			return response.sendError(res, 'No Initialisation');
		}
		return response.sendResponse(res, result);
	} catch (e) {
		console.log(e);
		return response.sendError(res, e);
	}
}

module.exports = {
	register,
	login,
	logout,
	init,
};
