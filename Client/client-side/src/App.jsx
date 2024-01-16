import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SharedLayuot from "./pages/SharedLayuot";
import LandingPage from "./pages/LandingPage";
import AskQuestion from "./pages/AskQuestion";
import AnswerPage from "./pages/AnswerPage";
import NotFoun from "./pages/NotFound";
import NotFound from "./pages/NotFound";
export let appcontext = createContext();

function App() {
	let [user, setuser] = useState({});

	let navigatTo = useNavigate();
	let token = localStorage.getItem("token");
	async function checkUser() {
		try {
			let { data } = await axios.get("/users/check", {
				headers: { Authorization: "Bearer " + token },
			});
			// console.log(data);
			setuser(data);
		} catch (error) {
			console.log(error.response);
			navigatTo("/");
		}
	}
	useEffect(() => {
		checkUser();
	});

	return (
		<appcontext.Provider value={{ user, setuser }}>
			<Routes>
				<Route path="/" element={<SharedLayuot />}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/questions" element={<HomePage />} />
					<Route path="/questions/ask" element={<AskQuestion />} />
					<Route path="/questions/:questionid" element={<AnswerPage />} />
					<Route path="/" element={<LoginPage />} />
					<Route path="/*" element={<NotFound />} />
				</Route>
			</Routes>
		</appcontext.Provider>
	);
}

export default App;
