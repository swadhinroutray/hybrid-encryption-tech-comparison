import React, { useState } from 'react';
import './Send.css';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Send = inject('loginStore')(
	observer(({ loginStore }) => {
		const [file, setFile] = useState();
		const [type, setType] = useState('');
		const [email, setEmail] = useState('');
		const [timer, setTimer] = useState(0);

		const saveFile = (e) => {
			setFile(e.target.files[0]);
		};

		const uploadFile = async (e) => {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('email', email);
			formData.append('toEmail', loginStore.profile.email);
			var t0 = performance.now();

			try {
				const res = await axios.post(
					'http://localhost:8080/api/sendfile/' + type,
					formData
				);
				console.log(res);
			} catch (ex) {
				console.log(ex);
			}
			var t1 = performance.now();
			setTimer(t1 - t0);
		};
		return (
			<div>
				<h1 className="heading">Send file to server</h1>
				<button onClick={(e) => loginStore.logout()}>Logout</button>
				<p className="para">Upload the file below</p>
				<div className="formClass" action="">
					<label
						style={{
							color: 'white',
						}}
					>
						Encryption Type
					</label>
					<br />
					<input
						type="text"
						onChange={(e) => setType(e.target.value)}
					></input>
					<br />
					<label
						style={{
							color: 'white',
						}}
					>
						Email
					</label>
					<br />
					<input
						type="text"
						name="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="off"
					></input>
					<br />
					<input
						style={{
							color: 'white',
						}}
						type="file"
						onChange={saveFile}
					/>
					<button onClick={uploadFile}>Upload</button>
				</div>
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
				<h3> Total Time Elapsed: {timer} </h3>
			</div>
		);
	})
);

export default Send;
