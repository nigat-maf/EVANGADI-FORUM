import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "../../src/axiosConfig";
import { useNavigate } from "react-router-dom";

function LoginPage({ toggle }) {
	
	let navigatTo = useNavigate();

	let emailNameDom = useRef(null);
	let passWordDom = useRef(null);

	let [show, setshow] = useState(false);
	

	function handlePassword() {
		if (!show) {
			setshow(true);
		} else {
			setshow(false);
		}
	}

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
			localStorage.setItem("token", data.token);
			// console.log(data);
			navigatTo("/questions");
			localStorage.setItem("", data.token);
		} catch (error) {
			alert(error.response?.data?.msg);
			console.log(error.response.data);
			navigatTo("/");
		}
	}
	return (
		<>
			<div
				className="bg-white mt-10 mb-5 ml-20 text-center w-1/3 border rounded-md border-gray-200 scroll-smooth">
			
				<br />
				<div className="w-full  px-5">
					<div className="text-center text-2xl  px-5">
						Login to your account
					</div>

					<div className="p-1">
						<span>Don’t have an account? </span>

						<div
							onClick={() => {
								toggle(false);
							}}
							className="text-red-400 hover:cursor-pointer touch-pan-right"
						>
							Create a new account
						</div>
					</div>
					<form onSubmit={handlSubmit} className=" rounded px-4 pt-6 pb-4 mb-4">
						<div className="mb-4">
							
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="email"
								ref={emailNameDom}
							/>
							<br />
						</div>
						<div className="mb-6 flex justify-between">
							<input
								className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:bg-green-50 inline-flex "
								id="password"
								type={show ? "text" : "password"}
								placeholder="password"
								ref={passWordDom}
							/>

							<p
								onClick={handlePassword}
								className="text-black text-xs italic absolute ml-60  py-2 pl-10 hover:cursor-pointer"
							>
								{show ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								)}
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
				<br />
			</div>
		</>
	);
}

export default LoginPage;
