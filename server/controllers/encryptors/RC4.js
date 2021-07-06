var crypto = require('crypto-js');

async function RC4encryption(key, buffer) {
	const cipherText = await crypto.RC4.encrypt(buffer, key).toString();
	return cipherText;
}
async function RC4decryption(key, buffer) {
	const bytesText = await crypto.RC4.decrypt(buffer, key);
	const plainText = bytesText.toString(crypto.enc.Utf8);
	return plainText;
}
module.exports = {
	RC4decryption,
	RC4encryption,
};
