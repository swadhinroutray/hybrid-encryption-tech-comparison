var crypto = require('crypto-js');

async function DESencryption(key, buffer) {
	const cipherText = await crypto.DES.encrypt(buffer, key).toString();
	return cipherText;
}

async function DESdecryption(key, buffer) {
	const bytesText = await crypto.DES.decrypt(buffer, key);
	const plainText = bytesText.toString(crypto.enc.Utf8);
	return plainText;
}

module.exports = {
	DESdecryption,
	DESencryption,
};
