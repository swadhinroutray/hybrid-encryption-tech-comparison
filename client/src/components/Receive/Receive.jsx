import React, { useState, useEffect } from 'react';
// import Send from '../Send/Send';
import './Receive.css';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { get, post } from '../../utils/api';
const download = require('downloadjs');

const Receive = inject('loginStore')(
	observer(({ loginStore }) => {
		const [files, setFiles] = useState([]);
		const [timer, setTimer] = useState(0);
		// const [primaryCheck, setPrimaryCheck] = useState(false);
		console.log(loginStore.profile.email);

		useEffect(() => {
			console.log(loginStore.profile.email);
			// console.log('/api/recieved/' + loginStore.profile.email);
			get('/api/recieved/' + loginStore.profile.email).then((res) => {
				console.log(res.data);
				setFiles(res.data[0].receivedFiles);
				console.log(res.data);
			});
			// setCardsLoaded(true);
			// setLoading(false);
		}, []);

		const handleClick = async (curr) => {
			console.log(curr);

			const postData = {
				fileID: curr.fileID,
			};
			// console.time('CLIENT_FETCH');
			var t0 = performance.now();

			fetch('/api/getfile/' + loginStore.profile.email, {
				method: 'POST',
				body: JSON.stringify(postData),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(function (resp) {
					console.log(resp);
					return resp.blob();
				})
				.then(function (blob) {
					console.log(blob);
				});
			var t1 = performance.now();
			setTimer(t1 - t0);
			console.timeEnd('CLIENT_FETCH');
		};

		return (
			<div>
				<h1 className="heading">Received files</h1>
				<table className="table">
					<thead className="tableHead">
						<tr className="tableRow">
							<th className="text" scope="col">
								From
							</th>
							<th className="text" scope="col">
								Encryption
							</th>
							<th className="text" scope="col">
								FileID
							</th>
							<th>Download</th>
						</tr>
					</thead>
					<tbody>
						{files.map((curr) => {
							return (
								<tr>
									{/* <th scope="row">{curr.id}</th> */}
									<td>{curr.from}</td>
									<td>{curr.type}</td>
									<td>{curr.fileID}</td>
									<td>
										<button
											onClick={() => handleClick(curr)}
										>
											Download
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<Link
					style={{
						textDecoration: 'none',
						color: 'red',
					}}
					color="inherit"
					justifyContent="center"
					to="/send"
				>
					Send Files
				</Link>

				<h3> Total Time Elapsed: {timer} </h3>
			</div>
		);
	})
);

export default Receive;
