const jwt = require("jsonwebtoken")
const { Messages } = require("./messages.js")

const secret = process.env.JWT_SECRET_KEY || "secret"
const validateToken = (bearer) => {
	// regex bearer token
	const regex = /^Bearer\s(.+)$/
	const match = regex.exec(bearer)
	if (!match) return false

	const token = match[1]
	try {
		return jwt.verify(token, secret)
	} catch (e) {
		return false
	}
}

const validateParams = (params) => {
	for (const param of params) {
		if (param == undefined || param === "") {
			return Messages.INVALID_REQUEST
		}
	}

	return Messages.GENERIC_OK
}

const sendResponse = (res, responseInfo, optionals = {}) => {
	const status = responseInfo.status
	res.status(status).json({
		Success: status < 400,
		Message: responseInfo,
		...optionals
	})
}

module.exports = { validateToken, validateParams, sendResponse }
