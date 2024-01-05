import React, { useContext, useEffect, useState } from "react";
import { appcontext } from "../App";
import axios from "../axiosConfig.js";

function HomePage() {
	let { user, setuser } = useContext(appcontext);
	let [questionList, setQuestionList] = useState([]);
	let token = localStorage.getItem("token");
	async function fetchAllQuestions() {
		try {
			let { data } = await axios.get("/questions/all-questions", {
				headers: { Authorization: "Bearer " + token },
			});
			setQuestionList(data.questions);
			// console.log(data);
		} catch (error) {
			console.log(error.response);
		}
	}
	useEffect(() => {
		fetchAllQuestions();
	}, []);
	console.log(questionList);
	return (
		<div className="bg-slate-100">
			<div className="text-3xl text-center flex justify-between ml-10 p-10 w-4/5">
				<div>
					<a
						href="/questions/ask"
						className="inline-block text-2xl px-6 mr-10 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-blue-700 mt-4 lg:mt-0 bg-blue-500"
					>
						Ask 	Question
					</a>
				</div>

				<h5 className="">Welcome :{user.username}</h5>
			</div>
			<div className="mx-30">
				<input
					type="text"
					className="p-3 w-3/4 border-black border around bg-white ml-20"
					placeholder="serch question"
				/>
				<br />
			</div>
			<hr />

			<div className=" max-h-80 mx-10 pb-20  overflow-y-scroll pr-20 w-3/4">
				{questionList?.map((single, i) => {
					let y = (
						<div
							key={i}
							className="flex justify-around max-h-50"
						>
							<div className=" pb-5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-20 h-30 border-2 rounded-full border-black border-solid p-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
									/>
								</svg>

								<a href="/questions/questionid">{single.username}</a>
							</div>
							<a href="/questions/questionid" className="pr-20">{single.title}</a>
							<div className="ml-80">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m8.25 4.5 7.5 7.5-7.5 7.5"
									/>
								</svg>
							</div>
						</div>
					);
					return y;
				})}
	
			</div>
			
		</div>
	);
}

export default HomePage;
