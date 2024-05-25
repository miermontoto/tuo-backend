const { query } = require('../database')
const { Messages } = require("../messages.js")


const getFriends = async (email, withFriendship = false) => {
	const sql = `SELECT u.email, u.name \
	${withFriendship ? ',CASE WHEN f2.toUser IS NOT NULL THEN TRUE ELSE FALSE END as friendship' : ''} \
	FROM friends as f \
	INNER JOIN users as u ON f.toUser = u.email \
	${withFriendship ? 'LEFT JOIN friends as f2 ON f2.fromUser = f.toUser AND f2.toUser = f.fromUser' : ''} \
	WHERE f.fromUser = ?`

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


module.exports = { addFriend, getFriends, deleteFriend, areFriends }
