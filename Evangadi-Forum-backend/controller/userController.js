let e = require("express");
let dbConnection = require("../model/model");
let bcrypt = require("bcrypt");
let { StatusCodes } = require("http-status-codes");
let jwt = require("jsonwebtoken");
async function register(req, res) {
	const { username, firstname, lastname, email, password } = req.body;
	if (!password || !firstname || !lastname || !email || !username) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please provide all required informations" });
	}
	try {
		const [user] = await dbConnection.query(
			"select username,userid from users where username=?or email=?",
			[username, email]
		);
		if (user.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "user already registerd" });
		}
		if (password.length < 8 || password.length > 10) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "password length must be between 8 & 10 " });
		}
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(password, salt);
		await dbConnection.query(
			"INSERT INTO users(username,firstname,lastname,email,password) VALUES(?,?,?,?,?)",
			[username, firstname, lastname, email, hashedPassword]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "user created" });
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something wrong" });
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please enter all required fields" });
	}

	try {
		const [user] = await dbConnection.query(
			"select username, userid,password from users where email = ?",
			[email]
		);

		if (user.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "invalid credential" });
		}

		// compare passwoed
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "invalid credential" });
		}

		const username = user[0].username;
		const userid = user[0].userid;
		const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		return res
			.status(StatusCodes.OK)
			.json({ msg: "user login successful", token });
	} catch (error) {
		console.log(error.message);

		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}

async function checkUser(req, res) {
	let username = req.user.username;
	let userid = req.user.userid;
	res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}
// function checkUser(req, res) {
// 	res.send("user checked");
// }

// function login(req, res) {
// 	res.send("user logedin");
// }
// function checkUser(req, res) {
// 	res.send("user checked");
// }
module.exports = { register, login, checkUser };
