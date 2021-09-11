import React, { useMemo, useState, useCallback } from "react";
import Select from "react-select";
import { Card, Button, Input } from "../components/index";
import { FiTrash2, FiPlusCircle } from "react-icons/fi";
import { db } from "../../firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
const request = require("request");

const Movie = () => {
	const [movieList, setMovieList] = useState([]);
	const [editting, setEditting] = useState(false);
	const [adding, setAdding] = useState(false);
	const [genre, setGenre] = useState({
		value: "",
		label: "",
	});
	const [title, setTitle] = useState("");
	const [year, setYear] = useState("");
	const [name, setName] = useState("");
	const [studentID, setStudentID] = useState("");
	const [contact, setContact] = useState("");
	const [email, setEmail] = useState("");

	const clear = useCallback(() => {
		setGenre({});
		setYear("");
		setTitle("");
		setEditting(false);
		setAdding(false);
	}, []);

	const deleteMovie = idx => {
		movieList.splice(idx, 1);
		setMovieList([...movieList]);
	};

	const addMovie = () => {
		setAdding(true);
		let result = {
			img: "",
			url: "",
		};
		request(
			`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOK70N2BFZsHBnw_rdxwsuuTf-g06d3os&part=id,snippet&type=video&q=${encodeURI(
				title + "(" + year + ")"
			)}&maxResults=1`,
			function (err, res, body) {
				let data = JSON.parse(body).items;
				if (data.length > 0) {
					result["url"] =
						"https://www.youtube.com/watch?v=" + data[0].id.videoId;
					result["img"] = data[0].snippet.thumbnails.medium.url;
				}

				movieList.push({
					title: title,
					year: year,
					genre: genre.label,
					img: result.img,
					url: result.url,
				});
				setMovieList([...movieList]);
				clear();
			}
		);
	};

	const submit = () => {
		if (
			window.confirm(
				"The personal information above will only be used on purpose of prize provide. I agree to provide personal information to RC."
			)
		) {
			if (
				name.length === 0 ||
				studentID.length === 0 ||
				contact.length === 0 ||
				email.length === 0
			) {
				window.alert("Please fill all information");
			} else {
				setDoc(
					doc(db, "movie", studentID),
					{
						name: name,
						studentID: studentID,
						contact: contact,
						email: email,
					},
					{ merge: true }
				).then(() => {
					movieList.forEach(movie => {
						setDoc(
							doc(db, `movie/${studentID}/movies`, movie.title),
							movie,
							{
								merge: true,
							}
						);
					});
					getDocs(collection(db, "movie")).then(snapshot => {
						window.alert(
							movieList.length.toString() + " movies submitted!"
						);
					});
				});
			}
		}
	};

	const options = useMemo(
		() => [
			{ value: "action", label: "Action" },
			{ value: "romance", label: "Romance" },
			{ value: "comedy", label: "Comedy" },
			{ value: "sf", label: "SF" },
			{ value: "animation", label: "Animation" },
			{ value: "thriller", label: "Thriller" },
			{ value: "horror", label: "Horror" },
			{ value: "survival", label: "Survival" },
			{ value: "animation", label: "Animation" },
			{ value: "reality", label: "Reality" },
			{ value: "mystery", label: "Mystery" },
			{ value: "sports", label: "Sports" },
		],
		[]
	);
	return (
		<div style={{ maxWidth: 500, flex: 1 }}>
			<h1>Movie/Drama</h1>
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
				<Input
					placeholder="ex) John Doe"
					onChange={e => {
						setName(e.target.value);
					}}
					value={name}
				/>
				<div style={{ marginTop: 20 }}>Student ID</div>
				<Input
					placeholder="ex) 12345678"
					onChange={e => {
						setStudentID(e.target.value);
					}}
					value={studentID}
				/>
				<div style={{ marginTop: 20 }}>Phone/KakaoID</div>
				<Input
					placeholder="ex) 01012345678"
					onChange={e => {
						setContact(e.target.value);
					}}
					value={contact}
				/>
				<div style={{ marginTop: 20 }}>Univ. email</div>
				<Input
					placeholder="ex) name@domain.com"
					onChange={e => {
						setEmail(e.target.value);
					}}
					value={email}
				/>
			</Card>
			<Card>
				<div style={{ textAlign: "center" }}>
					<b>Genres</b>
				</div>
				<p>
					Action, Romance, Comedy, SF, Animation, Thriller, Criminal,
					Horror, Reality, Survival, Mystery, Sports, etc.
				</p>
			</Card>

			{movieList.map((movie, idx) => (
				<Card key={idx}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
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
								onClick={() => window.open(movie.url, "_blank")}
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
							</div>
						</div>

						<FiTrash2
							size={25}
							style={{ flex: "none", cursor: "pointer" }}
							onClick={() => {
								deleteMovie(idx);
							}}
						/>
					</div>
				</Card>
			))}
			{editting ? (
				<Card>
					<h2
						style={{
							marginTop: 5,
							textAlign: "center",
						}}
					>
						Add Movie/Drama
					</h2>
					<div>Title</div>
					<Input
						placeholder="ex) Titanic"
						onChange={e => {
							setTitle(e.target.value);
						}}
						value={title}
					/>
					<div style={{ marginTop: 20 }}>Year</div>
					<Input
						placeholder="ex) 1997"
						onChange={e => {
							setYear(e.target.value);
						}}
						value={year}
					/>
					<div style={{ marginTop: 20, marginBottom: 10 }}>Genre</div>
					<Select
						value={genre}
						options={options}
						onChange={input => {
							setGenre(input);
						}}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							marginTop: 10,
						}}
					>
						<Button onClick={() => clear()}>Cancel</Button>
						<Button
							highlighted
							onClick={
								adding
									? () => console.log("wait!")
									: () => addMovie()
							}
						>
							{adding ? "wait..." : "Add"}
						</Button>
					</div>
				</Card>
			) : (
				<Card
					centered={true}
					clickable={true}
					onClick={() => {
						setEditting(true);
					}}
				>
					<div>
						<FiPlusCircle size={25} />
					</div>
				</Card>
			)}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					margin: 20,
				}}
			>
				<Button highlighted onClick={() => submit()}>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default Movie;
