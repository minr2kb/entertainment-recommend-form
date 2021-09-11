import React from "react";
import { useHistory } from "react-router";
import Card from "../components/Card";
import Button from "../components/Button";

const Home = () => {
	const history = useHistory();
	return (
		<div>
			<header>
				<h1>RA event</h1>
			</header>
			<Card>
				<div>
					<p>Hello</p>
					<p>I'm Kyungbae Min</p>
				</div>
			</Card>
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				<Button onClick={() => history.push("/music")}>Music</Button>
				<Button onClick={() => history.push("/movie")}>Movie</Button>
			</div>
		</div>
	);
};

export default Home;
