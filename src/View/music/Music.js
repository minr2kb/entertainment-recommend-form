import React, { useMemo, useState, useCallback, useEffect } from "react";
import Select from "react-select";
import { Card, Button, Input } from "../components/index";
import { FiTrash2, FiPlusCircle } from "react-icons/fi";

const Music = () => {
	const [songList, setSongList] = useState([
		{
			title: "Paris in the rain",
			artist: "Lauv",
			category: "studying",
		},
		{
			title: "Paris in the rain2",
			artist: "Lauv2",
			category: "studying2",
		},
	]);

	const [editting, setEditting] = useState(false);
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
	}, []);

	const deleteSong = idx => {
		songList.splice(idx, 1);
		setSongList([...songList]);
	};

	const addSong = () => {
		songList.push({
			title: title,
			artist: artist,
			category: category.label,
		});
		setSongList([...songList]);
		console.log(songList);
		clear();
	};

	const options = useMemo(
		() => [
			{ value: "studying", label: "Studying" },
			{ value: "working out", label: "Working out" },
			{ value: "depressing", label: "Depressing" },
			{ value: "crush", label: "When you have crush" },
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
			{songList.map((song, idx) => (
				<Card key={idx}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<img
								id="img"
								alt="true"
								style={{
									width: "30%",
									borderRadius: 8,
									cursor: "pointer",
									marginRight: 10,
								}}
								src="https://i.ytimg.com/vi/kOCkne-Bku4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&amp;rs=AOn4CLDMO8EOfXNnUbOEF7yvIf51XRt2Pg"
								onClick={() =>
									window.open(
										"https://www.youtube.com/watch?v=kOCkne-Bku4",
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
									Title: <b>{song.title}</b>
								</div>
								<div style={{ marginTop: 3, marginBottom: 3 }}>
									Artist: <b>{song.artist}</b>
								</div>
								<div style={{ marginTop: 3, marginBottom: 3 }}>
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
						<Button highlighted onClick={() => addSong()}>
							Add
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
					margin: 40,
				}}
			>
				<Button
					highlighted
					onClick={() =>
						window.alert(
							songList.length.toString() + " songs submitted!"
						)
					}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default Music;
