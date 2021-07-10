import React, { useState } from 'react';
import './Register.css';
import { post } from '../../utils/api';
import { Link } from 'react-router-dom';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [password, setPassword] = useState('');

	const registerButtonClick = async (e) => {
		e.preventDefault();
		const postData = {
			name: name,
			email: email,
			password: password,
			contact: contact,
		};
		post(`/api/register`, postData).then((res) => {
			if (res.success) {
				console.log(res.data);
			} else {
				alert('Error in registering user');
			}
		});
	};
	return (
		<div>
			<div>
				<div id="login">
					<div className="container">
						<div
							id="login-row"
							className="row justify-content-center align-items-center"
						>
							<div id="login-column" className="col-md-6">
								<div id="login-box" className="col-md-12">
									<form
										id="login-form"
										className="form"
										action=""
										method="post"
									>
										<h3 className="text-center heading">
											Register
										</h3>
										<div className="form-group">
											<label
												for="email"
												className="text-info"
											>
												Email:
											</label>
											<input
												type="text"
												name="email"
												id="email"
												className="form-control"
												onChange={(e) =>
													setEmail(e.target.value)
												}
												autoComplete="off"
											></input>
										</div>
										<div className="form-group">
											<label
												for="name"
												className="text-info"
											>
												Name:
											</label>
											<input
												type="text"
												name="name"
												id="name"
												className="form-control"
												onChange={(e) =>
													setName(e.target.value)
												}
												autoComplete="off"
											></input>
										</div>
										<div className="form-group">
											<label
												for="contact"
												className="text-info"
											>
												Contact:
											</label>
											<input
												type="text"
												name="contact"
												id="contact"
												className="form-control"
												onChange={(e) =>
													setContact(e.target.value)
												}
												autoComplete="off"
											></input>
										</div>
										<div className="form-group">
											<label
												for="password"
												className="text-info"
											>
												Password:
											</label>
											<input
												type="text"
												type="password"
												name="password"
												id="password"
												className="form-control"
												onChange={(e) =>
													setPassword(e.target.value)
												}
												autoComplete="off"
											></input>
										</div>
										<div className="form-group">
											<input
												type="submit"
												name="submit"
												className="btn btn-info btn-md"
												onClick={registerButtonClick}
												value="Register"
											></input>
										</div>
										<p>
											<Link
												style={{
													textDecoration: 'none',
													color: 'red',
												}}
												color="inherit"
												justifyContent="center"
												to="/login"
											>
												Login
											</Link>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
