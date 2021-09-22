import React from "react";
import { useHistory } from "react-router";
import Card from "../components/Card";
import Button from "../components/Button";

const Home = () => {
	const history = useHistory();
	return (
		<div style={{ maxWidth: 500, flex: 1 }}>
			<header>
				<h1>21F RA Event</h1>
			</header>
			<Card>
				<div style={{ padding: 10 }}>
					<p>
						Hi!👋 We are Snapshot committee from RC team! Many
						students are spending a lot of time at home due to the
						COVID-19 pandemic. If you have your own good items to
						soothe boredom, please share with us!
					</p>
					<p>
						<b>🎬Categories</b>
					</p>
					<div>- Music</div>
					<div>- Movie/TV Show/Drama</div>
					<p>
						<b>🥳Prize</b>
					</p>
					<div>- CJ Gift Card (10,000￦) to 26 people</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: 10,
						}}
					>
						<img
							src={
								"https://www.cjone.com/cjmweb/cashimg//2021/05/20210531179c2a9689058"
							}
							width={"70%"}
							alt="CJ"
						/>
					</div>
					<p>
						**Must write 3 or more sentences for reason to be chosen
						as winner!**
					</p>
					{/* <p>
						<b>Click the button below and submit your tips!</b>
					</p> */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
						}}
					>
						{/* <Button onClick={() => history.push("/music")}>
							Music
						</Button>
						<Button onClick={() => history.push("/movie")}>
							Movie
						</Button> */}
						<p>
							<b>
								Event is done! Thank you for your participation!
							</b>
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Home;
