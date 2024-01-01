import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
	let token = localStorage.getItem("token");
	let navigatTo = useNavigate();
	async function checkUser() {
		try {
		let {data}=	await axios.get("/users/check", {
				headers: { Authorization: "Bearer" + token },
			});
			console.log(data)
		} catch (error) {
			console.log(error.response.data);
			navigatTo("/login");
		}
	}
	useEffect(() => {
		checkUser();
	}, []);
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</>
	);
}

export default App;
