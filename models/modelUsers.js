
const { query } = require('../database')
const { Messages } = require("../messages.js")
const createUser = async (email, name, password) => {
	const result = await query('INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)', [email, name, password, 'user'])

	if (result.errno == 1062) return Messages.USER_ALREADY_EXISTS
	if (result.errno) return Messages.INTERNAL_ERROR
	return Messages.USER_CREATED
}

const checkCredentials = async (email, password) => {
	const user = await query('SELECT id, email, password FROM users WHERE email = ? AND password = ?', [email, password])

	if (user.length === 0) return Messages.INVALID_CREDENTIALS

	// validación estricta de contraseña
	// la query de búsqueda en base de datos no es case sensitive, lo que
	// provoca que no se compruebe de forma correcta la contraseña
	if (user[0].password !== password) return Messages.INVALID_CREDENTIALS
	delete user.password // eliminar contraseña plana del objeto user

	return user
}


const getIdFromEmail = async (email) => {
	const user = await query('SELECT id FROM users WHERE email = ?', [email])

	if (user.errno) return Messages.INTERNAL_ERROR
	if (user.length === 0) return Messages.USER_DOES_NOT_EXIST

	return user[0].id
}

module.exports = { createUser, checkCredentials, getIdFromEmail }
