import React from "react";

function Navbar() {
	return (
		<nav className="flex items-center justify-between flex-wrap bg-white py-10 px-20">
			<div className="flex items-center flex-shrink-0 text-black mr-6">
				<img
					src="https://forum.ibrodev.com/assets/evangadi-logo-5fea54cc.png"
					alt=""
				/>
			</div>
			<div className="w-full block flex-grow lg:flex lg:items-right lg:w-auto justify-around">
				<div className=" lg:flex-grow pl-80 justify-between items-right">
					<a
						href="#responsive-header"
						className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4"
					>
						HOME
					</a>
					<a
						href="#responsive-header"
						className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white "
					>
						How it works
					</a>
				</div>
				<div>
					<a
						href="/login"
						className="inline-block text-sm px-10 mr-10 py-2 pr-10 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-blue-700 mt-4 lg:mt-0 bg-blue-500"
					>
						SIGN IN
					</a>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
