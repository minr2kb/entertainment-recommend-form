import React, { useState, useEffect, useCallback } from "react";
import { Card, Button } from "../components/index";

import { db } from "../../firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

const Winner = () => {
	const [totalDict, setTotalDict] = useState({});
	const [showMusic, setShowMusic] = useState([]);
	const [showMovie, setShowMovie] = useState([]);
	const [winners, setWinners] = useState([]);

	function countSentences(str) {
		return str.replace(/\w[.?!][\s|$]/g, "|").split("|").length;
	}

	function remove(list, target) {
		return list.filter(elem => elem !== target);
	}

	function pickWinners() {
		if (winners.length === 0) {
			let participants = [];
			let picked = [];
			Object.values(totalDict).forEach(user => {
				user.songs?.forEach(song => {
					countSentences(song.reason) >= 3 &&
						participants.push(user.studentID);
				});
				user.movies?.forEach(movie => {
					countSentences(movie.reason) >= 3 &&
						participants.push(user.studentID);
				});
			});
			for (let i = 0; i < 26; i++) {
				var num = Math.floor(Math.random() * participants.length);
				picked.push(participants[num]);
				participants = remove(participants, participants[num]);
			}
			console.log(picked);
			setWinners(picked);
		} else {
			setWinners([]);
		}
	}

	async function fetchDict() {
		let dict = {};

		getDocs(query(collection(db, "music"), orderBy("time", "desc"))).then(
			users => {
				users.forEach(
					user => (dict[user.data().studentID] = user.data())
				);
				getDocs(
					query(collection(db, "movie"), orderBy("time", "desc"))
				).then(users => {
					users.forEach(
						user =>
							(dict[user.data().studentID] = Object.assign(
								{},
								dict[user.data().studentID],
								user.data()
							))
					);
					setTotalDict(dict);
				});
			}
		);
	}

	const fetchData = useCallback(async () => {
		await fetchDict();
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div style={{ maxWidth: 500, flex: 1 }}>
			<h1>Winners</h1>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					margin: 20,
				}}
			>
				<Button
					highlighted={winners.length !== 0}
					onClick={() => {
						pickWinners();
					}}
				>
					Pick 26
				</Button>
			</div>

			{Object.values(totalDict).map(user => (
				<div key={user.studentID}>
					<div style={{ marginTop: 40 }}>
						<Card
							backgroundColor="transparent"
							highlighted={winners.includes(user.studentID)}
						>
							<div>
								Name: <b>{user.name}</b>
							</div>
							<div style={{ marginTop: 10 }}>
								Student ID: <b>{user.studentID}</b>
							</div>
							<div style={{ marginTop: 10 }}>
								Contact: <b>{user.contact}</b>
							</div>
							<div style={{ marginTop: 10 }}>
								E-mail: <b>{user.email}</b>
							</div>
							<div style={{ marginTop: 10 }}>
								Time:{" "}
								<b>
									{user.time
										.toDate()
										.toString()
										.substr(0, 24)}
								</b>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
									marginTop: 10,
								}}
							>
								<Button
									highlighted={showMusic.includes(
										user.studentID
									)}
									onClick={() => {
										user.songs?.length &&
											(showMusic.includes(user.studentID)
												? setShowMusic(
														remove(
															showMusic,
															user.studentID
														)
												  )
												: setShowMusic([
														...showMusic,
														user.studentID,
												  ]));
									}}
								>
									Music({user.songs?.length || 0})
								</Button>
								<Button
									highlighted={showMovie.includes(
										user.studentID
									)}
									onClick={() => {
										user.movies?.length &&
											(showMovie.includes(user.studentID)
												? setShowMovie(
														remove(
															showMovie,
															user.studentID
														)
												  )
												: setShowMovie([
														...showMovie,
														user.studentID,
												  ]));
									}}
								>
									Movie({user.movies?.length || 0})
								</Button>
							</div>
						</Card>
					</div>
					{showMusic.includes(user.studentID) &&
						user.songs?.map((song, idx) => (
							<Card key={idx}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<img
										id="img"
										alt="img"
										style={{
											width: "30%",
											borderRadius: 8,
											cursor: "pointer",
											marginRight: 10,
										}}
										src={song.img}
										onClick={() =>
											window.open(song.url, "_blank")
										}
									/>
									<div>
										<div
											style={{
												marginTop: 3,
												marginBottom: 3,
											}}
										>
											Title: <b>{song.title}</b>
										</div>
										<div
											style={{
												marginTop: 3,
												marginBottom: 3,
											}}
										>
											Artist: <b>{song.artist}</b>
										</div>
										<div
											style={{
												marginTop: 3,
												marginBottom: 3,
											}}
										>
											Category: <b>{song.category}</b>
										</div>
										<div
											style={{
												marginTop: 3,
												marginBottom: 3,
											}}
										>
											Reason: <b>{song.reason}</b>
										</div>
									</div>
								</div>
							</Card>
						))}
					{showMovie.includes(user.studentID) &&
						user.movies?.map((movie, idx) => (
							<Card key={idx}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<img
										id="img"
										alt="img"
										style={{
											width: "30%",
											borderRadius: 8,
											cursor: "pointer",
											marginRight: 10,
										}}
										src={movie.img}
										onClick={() =>
											window.open(movie.url, "_blank")
										}
									/>
									<div>
										<div
											style={{
												marginTop: 3,
												marginBottom: 3,
											}}
										>
											Title: <b>{movie.title}</b>
										</div>
										<div
											style={{
												marginTop: 3,
												marginBottom: 3,
											}}
										>
											Year(Optional): <b>{movie.year}</b>
										</div>
										<div
											style={{
												marginTop: 3,
												marginBottom: 3,
											}}
										>
											Genre: <b>{movie.genre}</b>
										</div>
										<div
											style={{
												marginTop: 3,
												marginBottom: 3,
											}}
										>
											Reason: <b>{movie.reason}</b>
										</div>
									</div>
								</div>
							</Card>
						))}
				</div>
			))}
		</div>
	);
};

export default Winner;
