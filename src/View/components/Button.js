import React from "react";
import "./components.css";

const Button = ({ children, onClick, highlighted }) => {
	return (
		<div
			onClick={onClick}
			className="button"
			style={{
				cursor: "pointer",
				backgroundColor: highlighted ? "lightseagreen" : "",
				color: highlighted ? "white" : "",
			}}
		>
			{children}
		</div>
	);
};

export default Button;
