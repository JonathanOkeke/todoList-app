const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

// get all todos and username
router.get('/', authorization, async (req, res) => {
	try {
		// Fetch the username and all the todos from the db using the req.user -> uuid
		const user = await pool.query('SELECT * FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1', [req.user]);
		res.json(user.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

//create a todo
router.post('/todos', authorization, async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query('INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *', [req.user, description]);
		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// update a todo
router.put('/todos/:id', authorization, async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updatedTodo = await pool.query('UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *', [description, id, req.user]);
		// Handling the case where the user does not own the todo
		if (updatedTodo.rows.length === 0) {
			return res.json('This todo is not yours');
		}
		res.json('Todo was updated successfully');
	} catch (err) {
		console.error(err.message);
	}
});

//delete a todo
router.delete('/todos/:id', authorization, async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query('DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *', [id, req.user]);
		if (deleteTodo.rows.length === 0) {
			return res.json('This todo is not yours');
		}
		res.json('Todo was deleted successfully');
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
