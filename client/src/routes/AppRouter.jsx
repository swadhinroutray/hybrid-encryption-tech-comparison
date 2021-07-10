import React, { useEffect } from 'react';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Send from '../components/Send/Send';
import Receive from '../components/Receive/Receive';
import { Switch, Router } from 'react-router';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { inject, observer, Provider } from 'mobx-react';

const AppRouter = inject('loginStore')(
	observer(({ loginStore }) => {
		useEffect(() => {
			console.log(loginStore.loggedIn);
			loginStore.getProfile();
		}, [loginStore]);

		return (
			<Provider loginStore={loginStore}>
				{loginStore.loading ? (
					<div>loading</div>
				) : (
					<Switch>
						<Route path={'/login'} component={Login} />
						<Route path={'/register'} component={Register} />
						<PrivateRoute path={'/send'} component={Send} />
						<PrivateRoute path={'/recieved'} component={Receive} />
						<Route exact path={'/'} component={Login} />
					</Switch>
				)}
			</Provider>
		);
	})
);

export default AppRouter;
