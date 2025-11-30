const jwt = require("jsonwebtoken");
const { JsonWebTokenError, TokenExpiredError, verify } = jwt;

const verifyToken = (req, res, next) => {
	const token = req.get("Access-Token");

	if (!token) {
		return res.status(401).json({ message: "User is not authorized" });
	}

	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		req.token = decoded;

		next();
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return res.status(401).json({
				message: "User is not authorized",
			});
		}

		if (error instanceof JsonWebTokenError) {
			return res.status(401).json({
				message: "User is not authorized",
			});
		}

		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = { verifyToken };
