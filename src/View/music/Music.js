import React, { useMemo, useState, useCallback } from "react";
import Select from "react-select";
import { Card, Button, Input } from "../components/index";
import { FiTrash2, FiPlusCircle } from "react-icons/fi";
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router";
const request = require("request");

const Music = () => {
	const history = useHistory();
	const [songList, setSongList] = useState([]);
	const [editting, setEditting] = useState(false);
	const [adding, setAdding] = useState(false);
	const [category, setCategory] = useState({
		value: "",
		label: "",
	});
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [name, setName] = useState("");
	const [studentID, setStudentID] = useState("");
	const [contact, setContact] = useState("");
	const [email, setEmail] = useState("");

	const clear = useCallback(() => {
		setCategory({});
		setArtist("");
		setTitle("");
		setEditting(false);
		setAdding(false);
	}, []);

	const deleteSong = idx => {
		songList.splice(idx, 1);
		setSongList([...songList]);
	};

	const addSong = () => {
		setAdding(true);
		let result = {
			img: "",
			url: "",
		};
		request(
			`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOK70N2BFZsHBnw_rdxwsuuTf-g06d3os&part=id,snippet&type=video&q=${encodeURI(
				title + artist
			)}&maxResults=1`,
			function (err, res, body) {
				let data = JSON.parse(body).items;
				if (data.length > 0) {
					result["url"] =
						"https://www.youtube.com/watch?v=" + data[0].id.videoId;
					result["img"] = data[0].snippet.thumbnails.medium.url;
				}

				songList.push({
					title: title,
					artist: artist,
					category: category.label,
					img: result.img,
					url: result.url,
				});
				setSongList([...songList]);
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
				email.length === 0 ||
				songList.length === 0
			) {
				window.alert("Please fill all information");
			} else {
				setDoc(
					doc(db, "music", studentID),
					{
						name: name,
						studentID: studentID,
						contact: contact,
						email: email,
					},
					{ merge: true }
				).then(() => {
					songList.forEach((song, idx) => {
						setDoc(
							doc(db, `music/${studentID}/songs`, song.title),
							song,
							{
								merge: true,
							}
						).then(() => {
							if (idx >= songList.length - 1) {
								window.alert(
									"Submitted " +
										songList.length.toString() +
										" song(s)!"
								);
								history.push("/");
							}
						});
					});
				});
			}
		}
	};

	const options = useMemo(
		() => [
			{ value: "studying", label: "Studying" },
			{ value: "working-out", label: "Working out" },
			{ value: "depressing", label: "Depressing" },
			{ value: "love", label: "Love" },
			{ value: "traveling", label: "Traveling" },
		],
		[]
	);
	return (
		<div style={{ maxWidth: 500, flex: 1 }}>
			<h1>Music</h1>
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
					<b>Categories</b>
				</div>
				<p>
					- <b>Studing</b>: Coding, Math, Creating something,
					Designing, Writing...
				</p>
				<p>
					- <b>Working out</b>: Interval, Dancing, Calm-walking...
				</p>
				<p>
					- <b>Depressing</b>: Overthinking or overwhelm (when you
					miss someone or heartbroken)...
				</p>
				<p>
					- <b>Love</b>: When you have a crush
				</p>
				<p>
					- <b>Traveling</b>: Traveling or jamming out in the car
				</p>
			</Card>

			{songList.map((song, idx) => (
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

						<FiTrash2
							size={25}
							style={{ flex: "none", cursor: "pointer" }}
							onClick={() => {
								deleteSong(idx);
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
						Add Song
					</h2>
					<div>Title</div>
					<Input
						placeholder="ex) Paris in the rain"
						onChange={e => {
							setTitle(e.target.value);
						}}
						value={title}
					/>
					<div style={{ marginTop: 20 }}>Artist</div>
					<Input
						placeholder="ex) Lauv"
						onChange={e => {
							setArtist(e.target.value);
						}}
						value={artist}
					/>
					<div style={{ marginTop: 20, marginBottom: 10 }}>
						Category
					</div>
					<Select
						value={category}
						options={options}
						onChange={input => {
							setCategory(input);
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
									: () => addSong()
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

export default Music;
