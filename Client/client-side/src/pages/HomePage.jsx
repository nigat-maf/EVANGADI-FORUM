import React, { useContext, useEffect, useState } from "react";
import { appcontext } from "../App";
import axios from "../axiosConfig.js";
import { Link } from "react-router-dom";

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

	return (
		<div className="bg-slate-100">
			<div className="text-3xl text-center flex justify-between ml-10 p-10 w-4/5">
				<div>
					<a
						href="/questions/ask"
						className="inline-block text-2xl px-6 mr-10 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-blue-700 mt-4 lg:mt-0 bg-blue-500"
					>
						Ask Question
					</a>
				</div>

				<h5 className="italic">Welcome: {user.username}</h5>
			</div>
			<div className="mx-30">
				<input
					type="text"
					className="p-3 w-4/5 border-gray-500 border around bg-white ml-20"
					placeholder="serch question"
				/>
				<br />
			</div>
			<hr />

			<div className=" bg-white max-h-80 ml-20  pb-20 pt-8 mt-5 overflow-y-scroll pr-20 w-4/5">
				{questionList?.map((single, i) => {
					let y = (
						<>
							<Link
								to={`/questions/${single.questionid}`}
								
							>
								<div key={i} className="flex justify-around max-h-50  py-6">
									<div className=" pb-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-20 h-30 border-2 rounded-full border-black border-solid p-5 "
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
											/>
										</svg>

										{single.username}
									</div>

									{single.title}

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
							</Link>
							<hr class="h-px my-2 bg-gray-300 border-0 dark:bg-gray-500 mx-5"></hr>
						</>
					);
					return y;
				})}
			</div>
			<br />
			<br />
		</div>
	);
}

export default HomePage;
