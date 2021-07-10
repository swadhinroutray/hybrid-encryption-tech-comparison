const { sendResponse, sendError } = require('../utils/responseHandler');
const { uuid } = require('uuidv4');
const { user } = require('../models/userModel');

async function getReceivedFiles(req, res) {
	try {
		const email = req.params.email;
		console.log(email);
		result = await user.find(
			{
				email: email,
			},
			{
				'receivedFiles.fileID': 1,
				'receivedFiles.from': 1,
				'receivedFiles.type': 1,
			}
		);
		if (!result) {
			return sendResponse(res, 'Error in response');
		}

		return sendResponse(res, result);
	} catch (e) {
		console.log(e);
		return sendResponse(res, e);
	}
}

module.exports = {
	getReceivedFiles,
};
