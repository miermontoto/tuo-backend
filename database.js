const mysql = require('mysql2');

const connection = mysql.createPool({
	host: 'localhost',
	user: 'mier',
	password: 'talentuo',
	database: 'presents'
})

const query = async (sql, values) => {
	try {
		return (await connection.promise().query(sql, values))[0]
	} catch (e) {
		return e
	}
}

module.exports = { query };
