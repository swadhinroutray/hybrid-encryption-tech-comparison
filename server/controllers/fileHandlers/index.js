//!TODO: Exports Common from this file
const { readFileAndPassToEncryptor } = require('./uploadAndRead');
const { decryptAndDownload } = require('./decryptAndDownload');

module.exports = {
	readFileAndPassToEncryptor,
	decryptAndDownload,
};
