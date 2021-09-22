import axios from "axios";

const instance = axios.create({
	// baseURL: "https://zcl-admin-web.herokuapp.com",
	//   baseURL: 'http://localhost:5000',
});

export default instance;
