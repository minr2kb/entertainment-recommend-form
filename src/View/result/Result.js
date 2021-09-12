import React, { useState, useEffect } from "react";
import { Card, Button } from "../components/index";

import { db } from "../../firebase";
import {
	getDocs,
	collection,
	query,
	orderBy,
	Timestamp,
} from "firebase/firestore";

const Result = () => {
	const [musicList, setMusicList] = useState([]);
	const [movieList, setMovieList] = useState([]);
	const [category, setCategory] = useState("music");

	async function fetchMusic() {
		let list = [];

		getDocs(query(collection(db, "music"), orderBy("time", "desc"))).then(
			users => {
				users.forEach(user => list.push(user.data()));
				setMusicList(list);
			}
		);
	}

	async function fetchMovie() {
		let list = [];
		getDocs(query(collection(db, "movie"), orderBy("time", "desc"))).then(
			users => {
				users.forEach(user => list.push(user.data()));
				setMovieList(list);
			}
		);
	}

	async function fetchData() {
		await fetchMusic();
		await fetchMovie();
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div style={{ maxWidth: 500, flex: 1 }}>
			<h1>Result</h1>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					margin: 20,
				}}
			>
				<Button
					highlighted={category === "music"}
					onClick={() => setCategory("music")}
				>
					Music
				</Button>
				<Button
					highlighted={category === "movie"}
					onClick={() => setCategory("movie")}
				>
					Movie
				</Button>
			</div>

			{category === "music"
				? musicList.map(user => (
						<div key={user.studentID}>
							<div style={{ marginTop: 40 }}>
								<Card backgroundColor="transparent">
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
								</Card>
							</div>
							{user?.songs.map((song, idx) => (
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
						</div>
				  ))
				: movieList.map(user => (
						<div key={user.studentID}>
							<div style={{ marginTop: 40 }}>
								<Card backgroundColor="transparent">
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
								</Card>
							</div>
							{user?.movies.map((movie, idx) => (
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
												Year(Optional):{" "}
												<b>{movie.year}</b>
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

export default Result;
