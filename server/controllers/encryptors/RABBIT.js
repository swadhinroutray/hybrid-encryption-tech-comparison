var crypto = require('crypto-js');

async function RabbitEncryption(key, buffer) {
	const cipherText = await crypto.Rabbit.encrypt(buffer, key).toString();
	return cipherText;
}

async function RabbitDecryption(key, buffer) {
	const bytesText = await crypto.Rabbit.decrypt(buffer, key);
	const plainText = bytesText.toString(crypto.enc.Utf8);
	return plainText;
}

module.exports = {
	RabbitEncryption,
	RabbitDecryption,
};
