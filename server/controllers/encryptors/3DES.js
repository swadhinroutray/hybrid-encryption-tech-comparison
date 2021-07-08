var crypto = require('crypto-js');

async function TripleDESencryption(key, buffer) {
	const cipherText = await crypto.TripleDES.encrypt(buffer, key).toString();
	return cipherText;
}

async function TripleDESdecryption(key, buffer) {
	const bytesText = await crypto.TripleDES.decrypt(buffer, key);
	const plainText = bytesText.toString(crypto.enc.Utf8);
	return plainText;
}

module.exports = {
	TripleDESdecryption,
	TripleDESencryption,
};
