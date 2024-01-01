let dbConnection = require("../model/model");
let bcrypt = require("bcrypt");
let { StatusCodes } = require("http-status-codes");
let jwt = require("jsonwebtoken");
const { param } = require("../routes/questionRoute");
async function allQuestions(req, res) {
	let userid = req.user.userid;
	try {
		const [questions] = await dbConnection.query(
			"select * from questions where userid = ?",
			[userid]
		);
		return res.status(StatusCodes.OK).json({ questions: questions });
	} catch (error) {
		console.log(error.message);

		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}
async function singleQuestion(req, res) {
	// let userid = req.user.userid;
	const questionid = req.params.questionid;

	console.log(questionid);
	try {
		let [question] = await dbConnection.query(
			"select * from questions where questionid=?",
			[questionid]
		);

		if (question.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: `there is no question with questionid of ${questionid}` });
		} else {
			return res.status(StatusCodes.OK).send(question);
		}
	} catch (error) {
		console.log(error.message);

		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}
async function questionPost(req, res) {
	let userid = req.user.userid;
	let { questionid, title, description, tag } = req.body;
	try {
		await dbConnection.query(
			"INSERT INTO questions(questionid,userid,title,description,tag) VALUES(?,?,?,?,?)",
			[questionid, userid, title, description, tag]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "question posted" });
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something wrong" });
	}
}
module.exports = { allQuestions, singleQuestion, questionPost };
