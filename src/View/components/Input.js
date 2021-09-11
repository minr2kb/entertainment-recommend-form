import React from "react";

const Input = ({ placeholder, onChange, value }) => {
	return (
		<div>
			<input
				placeholder={placeholder}
				className="input"
				onChange={onChange}
				value={value}
			/>
		</div>
	);
};

export default Input;
