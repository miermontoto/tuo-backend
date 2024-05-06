const mysql = require('mysql');

let database = {
	configuration: {
		host: 'localhost',
		root: 'root',
		password: 'talentuo',
		database: 'presents',
		multipleStatements: true
	},
	connected: false,
	mysqlConnection: null,
	query: null,
	connect() {
		if (this.connected) {
			return;
		}
		this.mysqlConnection = mysql.createConnection(this.configuration);
		this.query = util.promisify(this.mysqlConnection.query).bind(this.mysqlConnection);
	},
	disconnect() {
		this.mysqlConnection.end();
		this.connected = false;
	},
}

module.exports = database;
