import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
	// Form inputs
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const { email, password } = inputs;

	const inputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	// Form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password };
			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			// Retrieve jwt and store in the localstorage
			const parseRes = await response.json();
			if (parseRes.token) {
				localStorage.setItem('token', parseRes.token);
				// Authorize user
				setAuth(true);
				toast.success('Login successful!');
			} else {
				setAuth(false);
				toast.error(parseRes);
			}
			// Clear form
			// setInputs({ email: '', password: '' });
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<Fragment>
			<h1 className=" text-center mt-5 mb-4">Login</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input type="email" className="form-control" name="email" value={email} onChange={(e) => inputChange(e)} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" className="form-control" name="password" value={password} onChange={(e) => inputChange(e)} />
				</div>
				<button type="submit" className="btn btn-primary btn-block">
					Login
				</button>
			</form>
			<div className="text-center mt-5">
				Don't have an account ? <Link to="/register">Register</Link>
			</div>
		</Fragment>
	);
};

export default Login;
