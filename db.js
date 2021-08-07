const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'JJ',
	password: 202103001,
	host: 'localhost',
	port: 5432,
	database: 'pernjwt',
});

(async () => {
	try {
		const client = await pool.connect();
		console.log('PostgreSQL connected');
		client.release();
	} catch (err) {
		client.release();
		console.error('Failed to connect to PostgreSQL db', err);
	}
})();

module.exports = pool;
