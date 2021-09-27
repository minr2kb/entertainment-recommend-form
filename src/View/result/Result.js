import React, { useState, useEffect, useCallback } from "react";
import { Card, Button } from "../components/index";

import { db } from "../../firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

// import { useHistory } from "react-router";

const musicGenres = {
	Studying: "Studying",
	Workout: "Working out",
	Depress: "Depressing",
	Love: "Love",
	Traveling: "Traveling",
};

const movieGenres = [
	"Action",
	"Romance",
	"Comedy",
	"SF",
	"Animation",
	"Thriller",
	"Horror",
	"Reality",
	"Survival",
	"Mystery",
];

const Result = () => {
	const [musicList, setMusicList] = useState([]);
	const [movieList, setMovieList] = useState([]);
	const [category, setCategory] = useState("music");
	const [musicGenre, setMusicGenre] = useState("");
	const [movieGenre, setMovieGenre] = useState("");
	// const history = useHistory();

	function pickRandom(n, list) {
		let all = list;
		let picked = [];
		for (let i = 0; i < n; i++) {
			var num = Math.floor(Math.random() * all.length);
			picked.push(all[num]);
			all = all.filter(elem => elem !== all[num]);
		}
		return picked;
	}

	async function fetchMusic() {
		let list = [];
		let songList = {};
		Object.values(musicGenres).forEach(elem => (songList[elem] = []));

		getDocs(query(collection(db, "music"), orderBy("time", "desc"))).then(
			users => {
				console.log("");
				console.log("<Music Random 3>");
				users.forEach(user => {
					list.push(user.data());
					user.data().songs.forEach(elem => {
						songList[elem.category] = [
							...songList[elem.category],
							elem.title,
						];
					});
				});
				setMusicList(list);
				Object.keys(songList).forEach(elem => {
					console.log(elem + ": " + pickRandom(3, songList[elem]));
				});
			}
		);
	}

	async function fetchMovie() {
		let list = [];
		let movieList = {};
		movieGenres.forEach(elem => (movieList[elem] = []));

		getDocs(query(collection(db, "movie"), orderBy("time", "desc"))).then(
			users => {
				console.log("");
				console.log("<Movie Random 3>");
				users.forEach(user => {
					list.push(user.data());
					user.data().movies.forEach(elem => {
						movieList[elem.genre] = [
							...movieList[elem.genre],
							elem.title,
						];
					});
				});
				setMovieList(list);
				Object.keys(movieList).forEach(elem => {
					console.log(elem + ": " + pickRandom(3, movieList[elem]));
				});
			}
		);
	}

	const fetchData = useCallback(async () => {
		await fetchMusic();
		await fetchMovie();
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

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
			<h2 style={{ margin: 10 }}>Genres</h2>
			<div
				style={{
					display: "flex",
					// justifyContent: "center",
					overflow: "scroll",
					// width: "10rem",
					paddingBottom: 10,
					marginBottom: 20,
				}}
			>
				{category === "music"
					? Object.keys(musicGenres).map(elem => (
							<Button
								key={elem}
								highlighted={musicGenre === elem}
								onClick={() => {
									if (musicGenre === elem) {
										setMusicGenre("");
									} else {
										setMusicGenre(elem);
									}
								}}
							>
								{elem}
							</Button>
					  ))
					: movieGenres.map(elem => (
							<Button
								key={elem}
								highlighted={movieGenre === elem}
								onClick={() => {
									if (movieGenre === elem) {
										setMovieGenre("");
									} else {
										setMovieGenre(elem);
									}
								}}
							>
								{elem}
							</Button>
					  ))}
			</div>

			{category === "music"
				? musicList.map(user => (
						<div key={user.studentID}>
							{/* <div style={{ marginTop: 40 }}>
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
							</div> */}
							{user?.songs.map(
								(song, idx) =>
									(musicGenre === "" ||
										song.category ===
											musicGenres[musicGenre]) && (
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
														window.open(
															song.url,
															"_blank"
														)
													}
												/>
												<div>
													<div
														style={{
															marginTop: 3,
															marginBottom: 3,
														}}
													>
														Title:{" "}
														<b>{song.title}</b>
													</div>
													<div
														style={{
															marginTop: 3,
															marginBottom: 3,
														}}
													>
														Artist:{" "}
														<b>{song.artist}</b>
													</div>
													<div
														style={{
															marginTop: 3,
															marginBottom: 3,
														}}
													>
														Category:{" "}
														<b>{song.category}</b>
													</div>
													<div
														style={{
															marginTop: 3,
															marginBottom: 3,
														}}
													>
														Reason:{" "}
														<b>{song.reason}</b>
													</div>
												</div>
											</div>
										</Card>
									)
							)}
						</div>
				  ))
				: movieList.map(user => (
						<div key={user.studentID}>
							{/* <div style={{ marginTop: 40 }}>
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
							</div> */}
							{user?.movies.map(
								(movie, idx) =>
									(movieGenre === "" ||
										movie.genre === movieGenre) && (
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
														window.open(
															movie.url,
															"_blank"
														)
													}
												/>
												<div>
													<div
														style={{
															marginTop: 3,
															marginBottom: 3,
														}}
													>
														Title:{" "}
														<b>{movie.title}</b>
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
														Genre:{" "}
														<b>{movie.genre}</b>
													</div>
													<div
														style={{
															marginTop: 3,
															marginBottom: 3,
														}}
													>
														Reason:{" "}
														<b>{movie.reason}</b>
													</div>
												</div>
											</div>
										</Card>
									)
							)}
						</div>
				  ))}
		</div>
	);
};

export default Result;
