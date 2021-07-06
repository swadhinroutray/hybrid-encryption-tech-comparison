var crypto = require('crypto-js');

async function AESencryption(key, buffer) {
	const cipherText = await crypto.AES.encrypt(buffer, key).toString();
	return cipherText;
}

async function AESdecryption(key, buffer) {
	const bytesText = await crypto.AES.decrypt(buffer, key);
	const plainText = bytesText.toString(crypto.enc.Utf8);
	return plainText;
}

module.exports = {
	AESdecryption,
	AESencryption,
};
