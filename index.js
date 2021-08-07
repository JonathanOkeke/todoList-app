const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const pool = require('./db');
const path = require('path');
const cors = require('cors');

// Production or local environment setup
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}

// Middleware //
app.use(cors());
app.use(express.json());

// Routes //

// Register and login routes
app.use('/auth', require('./routes/jwtAuth'));

// Dashboard route
app.use('/dashboard', require('./routes/dashboard'));

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
