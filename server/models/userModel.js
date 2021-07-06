const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	userID: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	RSAPrivateKey: {
		type: String,
		required: true,
	},
	RSAPublicKey: {
		// ! Generated on Registeration of the user
		type: String,
		required: true,
	},

	contact: {
		// Phone numner
		type: String,
		required: true,
	},
	receivedFiles: {
		type: Array,
	},
});

const user = mongoose.model('user', userSchema);
module.exports = {
	user,
};
