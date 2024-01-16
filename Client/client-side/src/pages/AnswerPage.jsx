import React, { useContext, useEffect, useRef, useState } from "react";
import { appcontext } from "../App";
import axios from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function AnswerPage() {
	let { user, setuser } = useContext(appcontext);
	// console.log(user.userid);
	let token = localStorage.getItem("token");
	let navigatTo = useNavigate();
	let [ansers, setansers] = useState([]);
	let [singlequestion, setsinglequestion] = useState({});
	let { questionid } = useParams();
	// console.log(questionid);
	let answerDom = useRef(null);

	let getanswerid = uuidv4();
	// console.log(getanswerid);

	async function fetchsinglequestion() {
		try {
			let { data } = await axios.get("/questions/" + questionid, {
				headers: { Authorization: "Bearer " + token },
			});
			// console.log(data[0]);
			setsinglequestion(data[0]);
		} catch (error) {
			console.log(error.response);
		}
	}
	async function fetchAnswers() {
		try {
			let { data } = await axios.get("/answers/" + questionid, {
				headers: { Authorization: "Bearer " + token },
			});
			// console.log(data.answers);
			setansers(data.answers);
		} catch (error) {
			console.log(error.response);
		}
	}
	async function postAnser() {
		let answerValue = answerDom.current.value;

		if (!answerValue) {
			alert("answer field is required");
			return;
		}
		try {
			let { data } = await axios.post(
				"/answers/" + questionid,
				{
					answerid: getanswerid,
					userid: user.userid,
					questionid: questionid,
					answer: answerValue,
				},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			alert("answer posted");
			// navigatTo("/questions");
		} catch (error) {
			console.log(error.response);
		}
	}
	useEffect(() => {
		fetchsinglequestion();
		
	}, []);
	useEffect(() => {
		
		fetchAnswers();
	},[]);
	return (
		<div className="bg-slate-100 pt-10 pl-30">
			<div className="pl-20">
				<h1 className="text-4xl underline decoration-solid">QUESTION</h1>
			</div>
			<div className="text-lg pl-20 mb-10">
				<h1 className="py-3 text-4xl decoration-solid italic">
					{singlequestion.title}
				</h1>
				<p className="text-2xl bold italic">{singlequestion.description}</p>
			</div>
			<hr />
			<div className="py-2 pl-20 ">
				<h1 className="text-5xl">Answer From The Community</h1>
			</div>
			<hr />
			<div className=" w-4/5 bg-gray-200 max-h-80 overflow-y-scroll py-10 pl-10 ml-20 my-10">
				{ansers?.map((each, i) => {
					let answersList = (
						<>
							<div className="flex pb-10  mb-5 pt-3 border-black bottom ">
								<div key={i}>
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
									<h2 className="text-2xl pl-3">{user.username}</h2>
								</div>
								<div className=" ml-10 mt-10 italic">{each.answer}</div>
							</div>
							<hr class="h-px my-2 bg-gray-300 border-0 dark:bg-gray-500 mr-5"></hr>
						</>
					);

					return answersList;
				})}
			</div>

			<div className="mx-30 ">
				<input
					type="text"
					className="p-3 w-4/5 border-gray-500 border rounded-lg bg-gray-50 ml-20 max-h-30 pb-28 text-align-top"
					placeholder="your anser..."
					ref={answerDom}
				/>
			</div>
			<div className="ml-20 mt-6 pb-10 flex justify-between w-4/5">
				<button
					onClick={postAnser}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
					type="button"
				>
					post Answer
				</button>
				<a
					href="/questions"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
				>
					Back to question page
				</a>
			</div>
		</div>
	);
}

export default AnswerPage;
