import React, { Fragment, useState } from 'react';

const InputTodo = ({ setTodosChange }) => {
	const [description, setDescription] = useState('');

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			// Constructing a new header
			const myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');
			myHeaders.append('token', localStorage.token);
			const body = { description };
			const response = await fetch('http://localhost:5000/dashboard/todos', {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify(body),
			});
			const parseRes = await response.json();
			console.log(parseRes);
			setTodosChange(true);
			setDescription('');
		} catch (error) {
			console.error(error.message);
		}
	};
	return (
		<Fragment>
			<h1 className="text-center mt-5">Input Todo</h1>
			<form className="d-flex mt-5" onSubmit={onSubmitForm}>
				<input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
				<button className="btn btn-success">Add</button>
			</form>
		</Fragment>
	);
};

export default InputTodo;
