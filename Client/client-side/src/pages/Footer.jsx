import React from "react";

function Footer() {
	return (
		<>
			<div className=" h-60 bg-gray-700 text-white flex justify-between  pt-10 px-20">
				<div>
					<div>
						<img
							src="https://forum.ibrodev.com/assets/evangadi-logo-footer-f73bca57.png"
							alt=""
						/>
					</div>
					<br />
					<div className="flex justify-between">
						<a href="">face</a>
						<a href="">inst</a>
						<a href="">yout</a>
					</div>
				</div>
				<div>
					<h2 className="text-2xl">Useful Link</h2><br />
					<a href="">How it works</a>
					<br />
					<a href="">Terms of Service</a>
					<br />
					<a href="">Privacy policy</a>
					<br />
				</div>
				<div>
					<h2 className="text-2xl">Contact Info</h2><br />
					<p>Nigat Gest</p>
					<p>nigatam2023.com</p>
					<p>phone</p>
				</div>
			</div>
		</>
	);
}

export default Footer;
