let dbConnection = require("../model/model");
let bcrypt = require("bcrypt");
let { StatusCodes } = require("http-status-codes");
let jwt = require("jsonwebtoken");
async function allAnswers(req, res) {
	// let userid = req.user.userid;
	let questionid = req.params.questionid;
	try {
		const [answers] = await dbConnection.query(
			"select * from answers where questionid = ?",
			[questionid]
		);
		if (answers.length == 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({ msg: "no answer" });
		} else {
			return res.status(StatusCodes.OK).json({ answers: answers });
		}
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}

async function answerPost(req, res) {
	let userid = req.user.userid;
	let questionid = req.params.questionid;
	let { answer } = req.body;
	try {
		await dbConnection.query(
			"INSERT INTO answers(userid,questionid,answer) VALUES(?,?,?)",
			[userid, questionid, answer]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "answer posted" });
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something wrong" });
	}
}
module.exports = { allAnswers, answerPost };
