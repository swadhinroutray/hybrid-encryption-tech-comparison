import React, { useState } from 'react';
import './Send.css';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const Send = inject('loginStore')(
	observer(({ loginStore }) => {
		return (
			<div>
				<h1 className="heading">Send file to server</h1>
				<button onClick={e => loginStore.logout()}>Logout</button>
				<p className="para">Upload the file below</p>
				<form className="formClass" action="/action_page.php">
					<input
						className="fileBtn"
						type="file"
						id="myFile"
						name="filename"
					/>
					<input
						className="submitBtn"
						type="submit"
						value="Send File"
					/>
				</form>
				<Link
					style={{
						textDecoration: 'none',
						color: 'red',
					}}
					color="inherit"
					justifyContent="center"
					to="/recieved"
				>
					Recieved Files
				</Link>
			</div>
		);
	})
);

export default Send;
