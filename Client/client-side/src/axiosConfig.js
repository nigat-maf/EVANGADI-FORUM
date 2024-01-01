import axios from "axios";
let instance = axios.create({
	baseURL: "http://localhost:5500/api",
});
export default instance;
