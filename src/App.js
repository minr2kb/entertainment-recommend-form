import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Loader from "react-spinners/BounceLoader";
import "./App.css";

const loading = (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "60vh",
		}}
	>
		<Loader color={"rgb(75, 192, 192)"} size={30} />
	</div>
);

const Home = React.lazy(() => import("./View/home/Home"));
const Music = React.lazy(() => import("./View/music/Music"));
const Movie = React.lazy(() => import("./View/movie/Movie"));

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<React.Suspense fallback={loading}>
					<Switch>
						<Route exact path="/" name="Home" component={Home} />
						<Route path="/music" name="music" component={Music} />
						<Route path="/movie" name="movie" component={Movie} />
					</Switch>
				</React.Suspense>
			</BrowserRouter>
		</div>
	);
}

export default App;
