import React, { useState, useEffect } from 'react';
import './Login.css';
import { post } from '../../utils/api';

import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';

const Login = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
			}
		}, [loginStore, primaryCheck]);
		return loginStore.loggedIn === true ? (
			<Redirect to="/send" />
		) : (
			<div>
				<div id="login">
					<div className="container">
						<div
							id="login-row"
							className="row justify-content-center align-items-center"
						>
							<div id="login-column" className="col-md-6">
								<div id="login-box" className="col-md-12">
									<div
										id="login-form"
										className="form"
										action=""
									>
										<h3 className="text-center heading">
											Login
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
												autoComplete="off"
												onChange={(e) =>
													loginStore.setField(
														'email',
														e.target.value
													)
												}
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
												autoComplete="off"
												onChange={(e) =>
													loginStore.setField(
														'password',
														e.target.value
													)
												}
											></input>
										</div>
										<div className="form-group">
											<input
												type="submit"
												name="submit"
												className="btn btn-info btn-md"
												value="Login"
												onClick={() =>
													loginStore.login()
												}
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
												to="/register"
											>
												Register
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	})
);

export default Login;
