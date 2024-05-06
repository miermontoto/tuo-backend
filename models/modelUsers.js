
const { query } = require('../database')
const { Messages } = require("../messages.js")
const createUser = async (email, name, password) => {
	const result = await query('INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)', [email, name, password, 'user'])

	if (result.errno == 1062) {
		return Messages.USER_ALREADY_EXISTS
	} else if (result.errno) {
		return Messages.INTERNAL_ERROR
	}

	return Messages.USER_CREATED
}

const checkCredentials = async (email, password) => {
	const user = await query('SELECT id, email FROM users WHERE email = ? AND password = ?', [email, password])

	if (user.length === 0) {
		return Messages.INVALID_CREDENTIALS
	}

	return user
}

module.exports = { createUser, checkCredentials }
