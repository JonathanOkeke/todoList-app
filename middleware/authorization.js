const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
	try {
		//1. destructure the token from the req header
		const jwtToken = req.header('token');
		// 2. check if token exists (if not send error)
		if (!jwtToken) {
			res.status(403).json('Not Authorized');
		}
		// 3. check if token is valid (has not expired and/or is not fake)
		const decodedToken = await jwt.verify(jwtToken, process.env.JWT_SECRET);
		req.user = decodedToken.user;
		next();
	} catch (err) {
		console.error(err.message);
		return res.status(403).json('Not Authorized');
	}
};
