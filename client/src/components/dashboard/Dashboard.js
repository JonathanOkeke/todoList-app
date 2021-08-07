import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Components
import InputTodo from './todolist/InputTodo';
import ListTodos from './todolist/ListTodos';

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState('');
	const [allTodos, setAllTodos] = useState([]);
	const [todosChange, setTodosChange] = useState(false);

	async function getProfile() {
		try {
			// Getting user's name
			const response = await fetch('http://localhost:5000/dashboard', {
				method: 'GET',
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			setName(parseRes[0].user_name);
			setAllTodos(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	}

	// Displaying username
	useEffect(() => {
		getProfile();
		setTodosChange(false);
	}, [todosChange]);

	// Logout with button
	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		setAuth(false);
		toast.success('Logged out successfully');
	};

	return (
		<Fragment>
			<div className="d-flex mt-5 justify-content-around">
				{name && <h1> Welcome {name.toUpperCase()} !</h1>}
				<button className="btn btn-warning" onClick={(e) => logout(e)}>
					Log Out
				</button>
			</div>
			<InputTodo setTodosChange={setTodosChange} />
			<ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
		</Fragment>
	);
};

export default Dashboard;
