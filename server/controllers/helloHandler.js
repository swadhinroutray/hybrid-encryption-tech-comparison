const response = require('../utils/responseHandler');
async function hello(req, res) {
	try {
		return response.sendResponse(res, 'Hello');
	} catch (error) {
		console.log(error);
		return response.sendError(res, error);
	}
}

module.exports = {
	hello,
};
