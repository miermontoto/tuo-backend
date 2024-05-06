const jwt = require("jsonwebtoken")
const { param } = require("./routers/routerUsers")
const validateToken = (bearer, res) => {
	// regex bearer token
	const regex = /^Bearer\s(.+)$/
	const match = regex.exec(bearer)
	if (!match) return false

	const token = match[1]
	try {
		jwt.verify(token, 'secret')
		return true
	} catch (e) {
		res.status(401).send("Unauthorized")
		return false
	}
}

const validateParams = (params, res) => {
	for (const param of params) {
		if (param == undefined || param === "") {
			res.status(400).send("Bad request")
			return false
		}
	}

	return true
}

module.exports = { validateToken, validateParams }
