import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
	// Form inputs
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		name: '',
	});

	const { name, email, password } = inputs;

	const inputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	// Form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password, name };
			const response = await fetch('http://localhost:5000/auth/register', {
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
				toast.success('Registration successful');
			} else {
				setAuth(false);
				toast.error(parseRes);
			}
			// Clear form
			// setInputs({ email: '', password: '', name: '' });
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
			<h1 className=" text-center mt-5 mb-4">Register</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input type="email" className="form-control" name="email" value={email} onChange={(e) => inputChange(e)} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" className="form-control" name="password" value={password} onChange={(e) => inputChange(e)} />
				</div>
				<div className="form-group">
					<label htmlFor="name">Username</label>
					<input type="text" className="form-control" name="name" value={name} onChange={(e) => inputChange(e)} />
				</div>
				<button type="submit" className="btn btn-primary btn-block">
					Register
				</button>
			</form>
			<div className="text-center mt-5">
				Already have an account ? <Link to="/login">Log In</Link>
			</div>
		</Fragment>
	);
};

export default Register;
