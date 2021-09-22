import React from "react";
import "./components.css";

const Card = ({
	children,
	clickable,
	centered,
	onClick,
	backgroundColor,
	color,
	highlighted,
}) => {
	return (
		<div
			className="card"
			style={{
				display: centered && "flex",
				justifyContent: centered && "center",
				cursor: clickable && "pointer",
				backgroundColor: backgroundColor,
				border: highlighted && "solid 2px lightseagreen",
				color: color,
			}}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Card;
