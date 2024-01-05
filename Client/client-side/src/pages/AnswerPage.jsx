import React from "react";

function AnswerPage() {
    
	return (
		<div className="bg-gray-100 pt-10">
			<div className="pl-20">
				<h1 className="text-4xl underline decoration-solid">QUESTION</h1>
			</div>
			<div className="text-lg pl-20 mb-10">
				<h1 className="py-3 text-4xl decoration-solid">what is...</h1>
				<p className="text-2xl bold">descriptin</p>
			</div>
			<hr />
			<div className="py-2 pl-20 ">
				<h1 className="text-5xl">Answer From The Community</h1>
			</div>
			<hr />
			<div className="bg-gray-200 max-h 40px overflow-y-scroll w-3/4 py-10 pl-10 ml-20 my-5 flex">
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-20 h-30 border-2 rounded-full border-black border-solid p-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
					<h2>username</h2>
				</span>
                <span className="inline-block ml-10">answer</span>
			</div>
			<div className="mx-30 ">
				<input
					type="text"
					className="p-3 w-3/4 border-gray-500 border rounded-lg bg-gray-50 ml-20 max-h-30 pb-28 text-align-top"
					placeholder="your anser..."
				/>
			</div>
			<div className="ml-20 mt-6 pb-10">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					post Answer
				</button>
			</div>
		</div>
	);
}

export default AnswerPage;
