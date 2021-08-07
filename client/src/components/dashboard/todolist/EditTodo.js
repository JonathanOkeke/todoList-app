import React, { Fragment, useState } from 'react';

export default function EditTodo({ todo, setTodosChange }) {
	const [description, setDescription] = useState(todo.description);

	// Update description function
	const updateDescription = async (e) => {
		e.preventDefault();
		try {
			// Constructing a new header
			const myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');
			myHeaders.append('token', localStorage.token);
			const body = { description };
			await fetch(`http://localhost:5000/dashboard/todos/${todo.todo_id}`, {
				method: 'PUT',
				headers: myHeaders,
				body: JSON.stringify(body),
			});
			setTodosChange(true);
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<Fragment>
			<button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
				Click to Edit
			</button>

			<div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Edit Todo</h4>
							<button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
								&times;
							</button>
						</div>

						<div className="modal-body">
							<input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
						</div>

						<div className="modal-footer">
							{/* Saving changes made to the todo */}
							<button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(e) => updateDescription(e)}>
								Save Changes
							</button>
							<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
