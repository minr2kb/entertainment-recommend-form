import React from "react";
import "./components.css";

const Card = ({
	children,
	clickable,
	centered,
	onClick,
	backgroundColor,
	color,
}) => {
	return (
		<div
			className="card"
			style={{
				display: centered ? "flex" : "inherit",
				justifyContent: centered ? "center" : "inherit",
				cursor: clickable ? "pointer" : "default",
				backgroundColor: backgroundColor,
				color: color,
			}}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Card;
