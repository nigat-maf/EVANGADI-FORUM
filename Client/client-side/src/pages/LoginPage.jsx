import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "../../src/axiosConfig";
import { useNavigate } from "react-router-dom";

function LoginPage() {
	let navigatTo = useNavigate();
	let emailNameDom = useRef(null);
	let passWordDom = useRef(null);

	async function handlSubmit(e) {
		e.preventDefault();
		let emailValue = emailNameDom.current.value;
		let passWordValue = passWordDom.current.value;
		if (!emailValue || !passWordValue) {
			alert("all fields required");
			return;
		}
		try {
			let { data } = await axios.post("/users/login", {
				email: emailValue,
				password: passWordValue,
			});
			alert("user logged in successfully");
			localStorage.setItem("token",data.token)
			navigatTo("/");
		} catch (error) {
			alert(error.response?.data?.msg);
			console.log(error.response.data);
		}
	}

	return (
		<>
			<div className="w-full max-w-xs mt-40 ml-20 bg-gray-200 pb-2 mb-3 px-5">
				<div className="text-center text-xl mt">Login to your account</div>
				<div className="p-1">
					<span>Don’t have an account?</span>
					<Link to="/register" className="text-red-400">
						Create a new account
					</Link>
				</div>
				<form
					onSubmit={handlSubmit}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							// htmlFor="username"
						>
							Email adress
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="email"
							ref={emailNameDom}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							// htmlFor="password"
						>
							Password
						</label>
						<input
							className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="******************"
							ref={passWordDom}
						/>
						<p className="text-red-500 text-xs italic">
							Please choose a password.
						</p>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Sign In
						</button>
						<a
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="#"
						>
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</>
	);
}

export default LoginPage;
