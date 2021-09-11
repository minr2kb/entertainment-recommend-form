import React from "react";
import "./components.css";

const Button = ({ children, onClick, highlighted }) => {
	return (
		<div
			onClick={onClick}
			className="button"
			style={{
				cursor: "pointer",
				backgroundColor: highlighted ? "rgb(60,70, 250)" : "white",
				color: highlighted ? "white" : "inherit",
			}}
		>
			{children}
		</div>
	);
};

export default Button;
