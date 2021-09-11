import React from "react";
import "./components.css";

const Card = ({ children, clickable, centered, onClick }) => {
	return (
		<div
			className="card"
			style={{
				display: centered ? "flex" : "inherit",
				justifyContent: centered ? "center" : "inherit",
				cursor: clickable ? "pointer" : "default",
			}}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Card;
