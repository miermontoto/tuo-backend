const { activeTokens } = require('../activeTokens')

const registerToken = (token) => {
	activeTokens.push(token)
}

const checkToken = (token) => {
	return activeTokens.includes(token)
}

const invalidateToken = (token) => {
	const index = activeTokens.indexOf(/^Bearer\s(.+)$/.exec(token)[1])
	if (index !== -1) {
		activeTokens.splice(index, 1)
	}
}

module.exports = { registerToken, checkToken, invalidateToken }
