import React from "react";
import { useRef, useState } from "react";
import axios from "../../src/axiosConfig";
import { useNavigate } from "react-router-dom";

function RegisterPage({ toggle }) {
	let navigatTo = useNavigate();
	let userNameDom = useRef(null);
	let firstNameDom = useRef(null);
	let lastNameDom = useRef(null);
	let emailNameDom = useRef(null);
	let passWordDom = useRef(null);

	async function handleSubmit(e) {
		e.preventDefault();
		let userNameValue = userNameDom.current.value;
		let firstNameValue = firstNameDom.current.value;
		let lastNameValue = lastNameDom.current.value;
		let emailValue = emailNameDom.current.value;
		let passWordValue = passWordDom.current.value;
		if (
			!userNameValue ||
			!firstNameValue ||
			!lastNameValue ||
			!emailValue ||
			!passWordValue
		) {
			alert("all fields required");
			return;
		}
		try {
			await axios.post("/users/register", {
				username: userNameValue,
				firstname: firstNameValue,
				lastname: lastNameValue,
				email: emailValue,
				password: passWordValue,
			});
			alert("user registered successfully");
			navigatTo("/login");
		} catch (error) {
			alert("somthing went wrong");
			console.log(error.response.data);
		}
	}

	return (
		<>
			<div className="w-1/3 ml-10 bg-blue-100 mt-10 mb-5 p-2 max-h-90 ">
				<h1 className="text-2xl text-center">creat account</h1>
				<form onSubmit={handleSubmit} className="  rounded px-8 pt-6 pb-10">
					<div className="mb-4">
						<input
							className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-green-50"
							// id="username"
							type="text"
							placeholder="Username"
							ref={userNameDom}
							// value={userNameDom}
						/>
					</div>
					<div className="mb-4">
						<input
							className="shadow appearance-none border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-green-50"
							// id="username"
							type="text"
							placeholder="first name"
							ref={firstNameDom}
						/>
					</div>
					<div className="mb-4">
						<input
							className="shadow appearance-none border border-gray-400  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-green-50"
							// id="username"
							type="text"
							placeholder="last name"
							ref={lastNameDom}
						/>
					</div>
					<div className="mb-4">
						<input
							className="shadow appearance-none border border-gray-400  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-green-50"
							// id="username"
							type="email"
							placeholder="email"
							ref={emailNameDom}
						/>
					</div>
					<div className="mb-6">
						<input
							className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-green-50"
							// id="password"
							type="password"
							placeholder="******************"
							ref={passWordDom}
						/>
						<p className="text-red-500 text-xs italic">
							Please choose a password.
						</p>
					</div>

					<div className="flex items-center justify-between px-10">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Register
						</button>
						<button
							onClick={() => toggle(true)}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
							type="button"
						>
						I have account
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default RegisterPage;
