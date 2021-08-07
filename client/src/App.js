import './App.css';
import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components //
import Landing from './components/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

// React toatify
toast.configure();

function App() {
	// Auth state
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Change auth state
	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	// Persist log in after tab refresh
	async function isAuth() {
		try {
			const response = await fetch('http://localhost:5000/auth/is-verify', {
				method: 'GET',
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
		} catch (err) {
			console.error(err.message);
		}
	}

	// Persisting log in using useEffect
	useEffect(() => {
		isAuth();
	}, []);

	return (
		<Fragment>
			<Router>
				<div className="container">
					<Switch>
						<Route exact path="/" render={(props) => (!isAuthenticated ? <Landing {...props} /> : <Redirect to="/dashboard" />)} />
						<Route exact path="/login" render={(props) => (!isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />)} />
						<Route exact path="/register" render={(props) => (!isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/login" />)} />
						<Route exact path="/dashboard" render={(props) => (isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />)} />
					</Switch>
				</div>
			</Router>
		</Fragment>
	);
}

export default App;
