const mysql = require('mysql2');

const connection = mysql.createPool({
	host: 'localhost',
	user: 'mier',
	password: 'talentuo',
	database: 'presents'
})

const query = async (sql, values = []) => {
	try {
		return (await connection.promise().query(sql, values))[0]
	} catch (e) {
		if (e.code === 'ECONNREFUSED') {
			console.error('database connection refused (offline/invalid config)')
			process.exit(1)
		}
		return e
	}
}


const testConnection = async () => {
	query('SELECT 1 + 1 AS solution')
}

module.exports = { query, testConnection };
