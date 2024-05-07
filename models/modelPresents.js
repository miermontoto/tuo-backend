const { query } = require('../database')
const { Messages } = require("../messages.js")


const getPresents = async (userId) => {
	const sql = 'SELECT id, name, description, url, price, chosenBy \
		FROM presents \
		WHERE userId = ?'

	const result = await query(sql, [userId])

	if (result.errno) return Messages.INTERNAL_ERROR

	return result
}


const getPresent = async (presentId) => {
	const sql = 'SELECT id, name, description, url, price, chosenBy, userId \
		FROM presents \
		WHERE id = ?'

	const result = await query(sql, [presentId])

	if (result.errno) return Messages.INTERNAL_ERROR
	if (result.length == 0) return Messages.PRESENT_NOT_FOUND

	return result[0]
}


const addPresent = async (userId, name, description, url, price) => {
	const result = await query('INSERT INTO presents (userId, name, description, url, price) VALUES (?, ?, ?, ?, ?)', [userId, name, description, url, price])

	if (result.errno) return Messages.INTERNAL_ERROR
	return Messages.PRESENT_ADDED
}


const updatePresent = async (presentId, name, description, url, price) => {
	const result = await query('UPDATE presents SET name = ?, description = ?, url = ?, price = ? WHERE id = ?', [name, description, url, price, presentId])

	if (result.errno) return Messages.INTERNAL_ERROR
	if (result.affectedRows == 0) return Messages.PRESENT_NOT_FOUND
	return Messages.PRESENT_UPDATED
}


const deletePresent = async (presentId) => {
	const result = await query('DELETE FROM presents WHERE id = ?', [presentId])

	if (result.errno) return Messages.INTERNAL_ERROR
	if (result.affectedRows == 0) return Messages.PRESENT_NOT_FOUND
	return Messages.PRESENT_DELETED
}

module.exports = { getPresents, getPresent, addPresent, updatePresent, deletePresent }
