const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

// pool.connect();

// registration
router.post('/register', validInfo, async (req, res) => {
	try {
		// 1. destructure the req.body -> get name, email and password

		const { name, email, password } = req.body;

		// 2. check if user exists ( if user exists then throw error)

		const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

		if (user.rows.length !== 0) {
			return res.status(401).json('User already exists');
		}

		// 3. Hash user password

		const salt = await bcrypt.genSalt(10);
		const hashedPsw = await bcrypt.hash(password, salt);

		// 4. enter new user into the database
		// const client = await pool.connect();

		const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPsw]);

		// 5. generating our jwt token

		const token = jwtGenerator(newUser.rows[0].user_id);
		res.json({ token });
		// client.release();
	} catch (err) {
		// client.release();
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// login
router.post('/login', validInfo, async (req, res) => {
	try {
		// 1. destructure the req.body

		const { email, password } = req.body;

		// 2. check if the user exists ( if not then we throw the error)
		// const client = await pool.connect();
		const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

		if (user.rows.length === 0) {
			return res.status(401).json('User with that email does NOT exist');
		}

		// 3. check if the incoming password mathces the database password

		const isMatch = await bcrypt.compare(password, user.rows[0].user_password);

		if (!isMatch) {
			return res.status(401).json('Incorrect password');
		}

		// 4. give them the jwt token

		const token = jwtGenerator(user.rows[0].user_id);
		res.json({ token });
		// client.release();
	} catch (err) {
		// client.release();
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// Verify JWT route to persist authentication after tab refresh
router.get('/is-verify', authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
