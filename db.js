const { Pool, Client } = require('pg');
require('dotenv').config();

// Localhost pg dev config
const devConfig = {
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE,
};

// Heroku production pg config //
const proConfig = {
	connectionString: process.env.DATABASE_URL, //heroku pg addon
};

// Pg pool connection //
const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

// Connect the db
const connectDB = async () => {
	try {
		// const client = await pool.connect();
		await pool.connect();
		console.log('PostgreSQL connected');
		client.release();
	} catch (err) {
		// client.release();
		console.error('Failed to connect to PostgreSQL db', err);
	}
};

connectDB();

module.exports = pool;
