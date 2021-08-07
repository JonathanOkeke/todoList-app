import React, { Fragment, useState, useEffect } from 'react';
// EditTo Component
import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
	console.log(allTodos);
	const [todos, setTodos] = useState([]);

	// Delete Todos
	const deleteTodo = async (id) => {
		try {
			await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
				method: 'DELETE',
				headers: { token: localStorage.token },
			});
			// Removing todo from frontend
			setTodos(todos.filter((todo) => todo.todo_id !== id));
		} catch (err) {
			console.error(err.message);
		}
	};

	// const getTodos = async () => {
	// 	try {
	// 		const response = await fetch('http://localhost:5000/dashboard');
	// 		const jsonData = await response.json();
	// 		console.log(jsonData);
	// 	} catch (err) {
	// 		console.error(err.message);
	// 	}
	// };

	useEffect(() => {
		setTodos(allTodos);
	}, [allTodos]);

	return (
		<Fragment>
			{''}
			<table className="table mt-5 text-center">
				<thead>
					<tr>
						<th>Description</th>
						<th>Edit Todo</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{todos.length !== 0 &&
						todos[0].todo_id !== null &&
						todos.map((todo) => (
							<tr key={todo.todo_id}>
								<td>{todo.description}</td>
								<td>
									<EditTodo todo={todo} setTodosChange={setTodosChange} />
								</td>
								<td>
									<button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					{/* <tr>
						<td>John</td>
						<td>Doe</td>
						<td>john@example.com</td>
					</tr> */}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ListTodos;
