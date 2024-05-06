const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET_KEY || "secret"
const validateToken = (bearer, res) => {
	// regex bearer token
	const regex = /^Bearer\s(.+)$/
	const match = regex.exec(bearer)
	if (!match) return false

	const token = match[1]
	try {
		return jwt.verify(token, secret)
	} catch (e) {
		sendResponse(res, 401, "Petición no autorizada")
		return false
	}
}

const validateParams = (params, res) => {
	for (const param of params) {
		if (param == undefined || param === "") {
			sendResponse(res, 400, "Petición inválida: parámetros incorrectos")
			return false
		}
	}

	return true
}

const sendResponse = (res, status, message, optionals = {}) => {
	res.status(status).json({
		success: status < 400,
		status: status,
		message: message,
		...optionals
	})
}

module.exports = { validateToken, validateParams, sendResponse }
