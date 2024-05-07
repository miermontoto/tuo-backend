const jwt = require("jsonwebtoken")
const { Messages } = require("./messages.js")
const { checkToken } = require("./models/modelTokens.js")

const secret = process.env.JWT_SECRET_KEY || "secret"


const validateToken = (bearer) => {
	// regex bearer token
	const regex = /^Bearer\s(.+)$/
	const match = regex.exec(bearer)
	if (!match) return false

	const token = match[1]
	try {
		if (!checkToken(token)) return false
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


const sendResponse = (res, responseInfo, data = null) => {
	const status = responseInfo.status
	let content

	if (responseInfo.status < 400) {
		content = { status: "success", data }
	} else {
		content = {
			status: status >= 500 ? "error" : "fail",
			message: responseInfo.message
		}
	}

	res.status(status).json(content)
}

module.exports = { validateToken, validateParams, sendResponse }
