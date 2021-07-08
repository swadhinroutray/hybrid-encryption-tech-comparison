const crypto = require('crypto');
const iv = crypto.randomBytes(8);

async function BlowfishEncryption(key, buffer) {
	console.log(iv);
	const cipher = crypto.createCipheriv('bf', key, iv);

	let encrypted = cipher.update(buffer, 'utf8', 'base64');
	encrypted += cipher.final('base64');
	return encrypted;
}
async function BlowfishDecryption(key, buffer) {
	const decipher = crypto.createDecipheriv('bf', key, iv);

	let decrypted = decipher.update(buffer, 'base64', 'utf8');
	decrypted += decipher.final();

	return decrypted;
}
module.exports = {
	BlowfishEncryption,
	BlowfishDecryption,
};
