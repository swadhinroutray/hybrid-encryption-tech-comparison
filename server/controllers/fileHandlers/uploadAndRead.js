const { sendResponse, sendError } = require('../../utils/responseHandler');
const { uuid } = require('uuidv4');
const { user } = require('../../models/userModel');
const AES = require('../encryptors/AES');
const DES = require('../encryptors/DES');
const RC4 = require('../encryptors/RC4');

const NodeRSA = require('node-rsa');

//! TODO: Add encrytor parameter
async function readFileAndPassToEncryptor(req, res) {
	try {
		const file = req.files[0];
		const toEmail = req.body.email;
		const fromEmail = req.session.email;
		// console.log(file);
		result = await user.findOne(
			{
				email: toEmail,
			},
			{
				RSAPublicKey: 1,
			}
		);
		if (!result) {
			console.log(e);
			return sendError(res, 'No such user exists');
		}

		const bufferData = file.buffer.toString('utf8');
		const encryptorKey = uuid();
		// console.log(result.RSAPublicKey);
		//! Pass to encryptor based on param

		if (req.params.encryptor == 'AES') {
			const ciphertext = await AES.AESencryption(
				encryptorKey,
				bufferData
			);
			const key = new NodeRSA(result.RSAPublicKey);
			const encryptedEkey = key.encrypt(encryptorKey, 'base64');
			const obj = {
				fileID: uuid(),
				from: fromEmail,
				type: 'AES',
				buffer: ciphertext,
				key: encryptedEkey,
			};
			pushData = await user.updateOne(
				{
					email: toEmail,
				},
				{
					$push: {
						receivedFiles: obj,
					},
				}
			);
			if (!pushData) {
				console.log(e);
				return sendError(res, 'Error in Encryption');
			}
		}
		if (req.params.encryptor == 'DES') {
			const ciphertext = await DES.DESencryption(
				encryptorKey,
				bufferData
			);
			const key = new NodeRSA(result.RSAPublicKey);
			const encryptedEkey = key.encrypt(encryptorKey, 'base64');
			const obj = {
				fileID: uuid(),
				from: fromEmail,
				type: 'DES',
				buffer: ciphertext,
				key: encryptedEkey,
			};
			pushData = await user.updateOne(
				{
					email: toEmail,
				},
				{
					$push: {
						receivedFiles: obj,
					},
				}
			);
			if (!pushData) {
				console.log(e);
				return sendError(res, 'Error in Encryption');
			}
		}
		if (req.params.encryptor == 'RC4') {
			const ciphertext = await RC4.RC4encryption(
				encryptorKey,
				bufferData
			);
			const key = new NodeRSA(result.RSAPublicKey);
			const encryptedEkey = key.encrypt(encryptorKey, 'base64');
			const obj = {
				fileID: uuid(),
				from: fromEmail,
				type: 'RC4',
				buffer: ciphertext,
				key: encryptedEkey,
			};
			pushData = await user.updateOne(
				{
					email: toEmail,
				},
				{
					$push: {
						receivedFiles: obj,
					},
				}
			);
			if (!pushData) {
				console.log(e);
				return sendError(res, 'Error in Encryption');
			}
		}

		return sendResponse(res, 'testing');
	} catch (e) {
		console.log(e);
		return sendResponse(res, e);
	}
}

module.exports = {
	readFileAndPassToEncryptor,
};
