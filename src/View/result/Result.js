import React, { useState, useEffect } from "react";
import { Card, Button, Input } from "../components/index";

import { db } from "../../firebase";
import { getDocs, doc, query, collection, where } from "firebase/firestore";

const Result = () => {
	const [musicList, setMusicList] = useState([]);
	const [movieList, setMovieList] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchMusic() {
		let list = [];
		getDocs(collection(db, "music")).then(users => {
			users.forEach(user => list.push(user.data()));
			setMusicList(list);
		});
	}

	async function fetchMovie() {
		let list = [];
		getDocs(collection(db, "movie")).then(users => {
			users.forEach(user => list.push(user.data()));
			setMovieList(list);
		});
	}

	async function fetchData() {
		await fetchMusic();
		await fetchMovie();
	}

	useEffect(() => {
		fetchData();
		setLoading(false);
	}, []);

	return (
		<div style={{ maxWidth: 500, flex: 1 }}>
			<h1>Result</h1>
			<Card>
				<h2
					style={{
						marginTop: 5,
						textAlign: "center",
					}}
				>
					Your Information
				</h2>
				<div>Name</div>

				<div style={{ marginTop: 20 }}>Student ID</div>

				<div style={{ marginTop: 20 }}>Phone/KakaoID</div>

				<div style={{ marginTop: 20 }}>Univ. email</div>
			</Card>

			{loading ? (
				<></>
			) : (
				musicList[0].songs.map((song, idx) => (
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
								onClick={() => window.open(song.url, "_blank")}
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
							</div>
						</div>
					</Card>
				))
			)}
		</div>
	);
};

export default Result;
