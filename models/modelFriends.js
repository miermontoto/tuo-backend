const { query } = require('../database')
const { Messages } = require("../messages.js")


const getFriends = async (email) => {
	const sql = 'SELECT u.email, u.name FROM friends as f \
		INNER JOIN users as u ON f.toUser = u.email \
		WHERE f.fromUser = ?'

	const result = await query(sql, [email])

	if (result.errno) return Messages.INTERNAL_ERROR

	return result
}


const addFriend = async (fromUser, toUser) => {
	const result = await query('INSERT INTO friends (fromUser, toUser) VALUES (?, ?)', [fromUser, toUser])

	if (result.errno == 1062) return Messages.ALREADY_BEFRIENDED
	if (result.errno == 1452) return Messages.INVALID_USER_EMAIL
	if (result.errno) return Messages.INTERNAL_ERROR
	return Messages.ADDED_FRIEND
}


const deleteFriend = async (fromUser, toUser) => {
	const result = await query('DELETE FROM friends WHERE fromUser = ? AND toUser = ?', [fromUser, toUser])

	if (result.errno == 1452) return Messages.INVALID_USER_EMAIL
	if (result.errno) return Messages.INTERNAL_ERROR
	if (result.affectedRows == 1) return Messages.DELETED_FRIEND
	return Messages.NOT_BEFRIENDED
}


const areFriends = async (fromUser, toUser) => {
	const sql = 'SELECT * FROM friends WHERE fromUser = ? AND toUser = ?'

	const result = await query(sql, [fromUser, toUser])

	if (result.errno) return Messages.INTERNAL_ERROR
	if (result.length == 0) return Messages.NOT_YOUR_FRIEND
	return Messages.GENERIC_OK
}

const checkFriendship = async (myEmail, friendEmail) => {
	// comprobar si estoy en su lista de amigos
	const check1 = await areFriends(friendEmail, myEmail)
	if (check1.status != 200) {
		return check1
	}

	// comprobar si está en mi lista de miamigos
	const check2 = await areFriends(myEmail, friendEmail)
	if (check2 == Messages.NOT_YOUR_FRIEND) { // intercambiar mensaje de error
		return Messages.NOT_BEFRIENDED
	}

	// comprobación genérica de errores (podría ser 500)
	if (check2.status != 200) {
		return check2
	}

	return Messages.GENERIC_OK
}


module.exports = { addFriend, getFriends, deleteFriend, areFriends, checkFriendship }
