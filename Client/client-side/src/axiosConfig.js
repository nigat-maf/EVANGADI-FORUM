import axios from "axios";
let instance = axios.create({
	// baseURL: "http://localhost:5500/api",
	baseURL: "https://evangadi-f-backend1.onrender.com/api",
});
export default instance;
