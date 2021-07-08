const { sendResponse, sendError } = require('../../utils/responseHandler');
const { uuid } = require('uuidv4');
const { user } = require('../../models/userModel');
const NodeRSA = require('node-rsa');
const { DESdecryption } = require('../encryptors/DES');
const fs = require('fs');
const { AESdecryption } = require('../encryptors/AES');
const { RC4decryption } = require('../encryptors/RC4');
const { TripleDESdecryption } = require('../encryptors/3DES');
const { BlowfishDecryption } = require('../encryptors/BLOWFISH');
const { RabbitDecryption } = require('../encryptors/RABBIT');

async function decryptAndDownload(req, res) {
	try {
		const fileID = req.body.fileID;
		const email = req.session.email;

		result = await user.aggregate([
			{ $match: { 'receivedFiles.fileID': fileID } },
			{
				$project: {
					receivedFiles: {
						$filter: {
							input: '$receivedFiles',
							as: 'receivedFiles',
							cond: { $eq: ['$$receivedFiles.fileID', fileID] },
						},
					},
					_id: 0,
				},
			},
		]);
		if (!result) {
			// console.log(result);
			return sendError(res, 'No such user exists');
		}
		// console.log(result[0]);

		//! retrieve user private key
		RSAPrivKey = await user.findOne(
			{
				email: email,
			},
			{
				RSAPrivateKey: 1,
			}
		);
		if (!RSAPrivKey) {
			return sendError(res, 'No such user exists');
		}
		const key = new NodeRSA(RSAPrivKey.RSAPrivateKey);
		const decryptedEKey = key.decrypt(
			result[0].receivedFiles[0].key,
			'utf8'
		);
		const dataBuffer = result[0].receivedFiles[0].buffer;
		const type = result[0].receivedFiles[0].type;

		//! Decryption depending on type
		switch (type) {
			case 'AES': {
				console.time('AES_DECRYPT');
				const decryptedBuffer = await AESdecryption(
					decryptedEKey,
					dataBuffer
				);
				console.timeEnd('AES_DECRYPT');

				try {
					await fs.writeFile(
						req.session.email + '_download.txt',
						decryptedBuffer,
						function (err) {
							if (err) return console.log(err);
							console.log('Decrypted Data > download.txt');
						}
					);
				} catch (err) {
					console.error(err);
				}
				break;
			}

			case 'DES': {
				console.time('DES_DECRYPT');

				const decryptedBuffer = await DESdecryption(
					decryptedEKey,
					dataBuffer
				);
				console.timeEnd('DES_DECRYPT');

				try {
					await fs.writeFile(
						req.session.email + '_download.txt',
						decryptedBuffer,
						function (err) {
							if (err) return console.log(err);
							console.log('Decrypted Data > download.txt');
						}
					);
				} catch (err) {
					console.error(err);
				}
				break;
			}
			case 'RC4': {
				console.time('RC4_DECRYPT');

				const decryptedBuffer = await RC4decryption(
					decryptedEKey,
					dataBuffer
				);
				console.timeEnd('RC4_DECRYPT');

				try {
					await fs.writeFile(
						req.session.email + '_download.txt',
						decryptedBuffer,
						function (err) {
							if (err) return console.log(err);
							console.log('Decrypted Data > download.txt');
						}
					);
				} catch (err) {
					console.error(err);
				}
				break;
			}
			case '3DES': {
				console.time('3DES_DECRYPT');

				const decryptedBuffer = await TripleDESdecryption(
					decryptedEKey,
					dataBuffer
				);
				console.timeEnd('3DES_DECRYPT');

				try {
					await fs.writeFile(
						req.session.email + '_download.txt',
						decryptedBuffer,
						function (err) {
							if (err) return console.log(err);
							console.log('Decrypted Data > download.txt');
						}
					);
				} catch (err) {
					console.error(err);
				}
				break;
			}
			case 'BLOWFISH': {
				console.time('BLOWFISH_DECRYPT');

				const decryptedBuffer = await BlowfishDecryption(
					decryptedEKey,
					dataBuffer
				);
				console.timeEnd('BLOWFISH_DECRYPT');

				try {
					await fs.writeFile(
						req.session.email + '_download.txt',
						decryptedBuffer,
						function (err) {
							if (err) return console.log(err);
							console.log('Decrypted Data > download.txt');
						}
					);
				} catch (err) {
					console.error(err);
				}
				break;
			}
			case 'RABBIT': {
				console.time('RABBIT_DECRYPT');

				const decryptedBuffer = await RabbitDecryption(
					decryptedEKey,
					dataBuffer
				);
				console.timeEnd('RABBIT_DECRYPT');

				try {
					await fs.writeFile(
						req.session.email + '_download.txt',
						decryptedBuffer,
						function (err) {
							if (err) return console.log(err);
							console.log('Decrypted Data > download.txt');
						}
					);
				} catch (err) {
					console.error(err);
				}
				break;
			}

			default:
				break;
		}

		return sendResponse(res, 'Download file created');
	} catch (e) {
		console.log(e);
		return sendResponse(res, e);
	}
}
module.exports = {
	decryptAndDownload,
};
