var crypto = require('crypto-js');
const { sendResponse, sendError } = require('../utils/response');

async function AESencryption(hash) {
	const cipherText = await crypto.AES.encrypt(
		hash,
		process.env.AES_SECRET_KEY
	).toString();

	return cipherText;
}
async function AESdecryption(hash) {
	const bytesText = await crypto.AES.decrypt(
		hash,
		process.env.AES_SECRET_KEY
	);
	const plainText = bytesText.toString(crypto.enc.Utf8);
	return plainText;
}
async function GenKeys(req, res) {
	try {
		console.log(process.env.AES_SECRET_KEY);
		const a = req.body.num1.toString();
		const b = req.body.num2.toString();

		const aCipher = await AESencryption(a);
		const bCipher = await AESencryption(b);
		// console.log(aCipher * bCipher);
		return sendResponse(res, { a: aCipher, b: bCipher });
	} catch (error) {
		console.log(error);
		sendError(res, error);
	}
}
async function GetKeys(req, res) {
	try {
		const a = req.body.num1;
		const b = req.body.num2;

		const aCipher = await AESdecryption(a);
		const bCipher = await AESdecryption(b);

		return sendResponse(res, { a: aCipher, b: bCipher });
	} catch (error) {
		console.log(error);
		sendError(res, error);
	}
}

module.exports = {
	GenKeys,
	GetKeys,
};
