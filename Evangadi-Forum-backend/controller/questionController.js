let dbConnection = require("../model/model");
let bcrypt = require("bcrypt");
let { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

let jwt = require("jsonwebtoken");
const { param } = require("../routes/questionRoute");
// question post controller!
async function questionPost(req, res) {
	let userid = req.user.userid;
	let { title, description, tag } = req.body;
	if (!title || !description) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "all fields required" });
	}
	try {
		let questionid = uuidv4();
		await dbConnection.query(
			"INSERT INTO questions(questionid,userid,title,description,tag) VALUES(?,?,?,?,?)",
			[questionid, userid, title, description, " no tag"]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "question posted" });
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something wrong" });
	}
}

async function allQuestions(req, res) {
	try {
		const [questions] = await dbConnection.query(
			"select title,description,questionid,username FROM questions JOIN users ON users.userid =questions.userid ORDER BY id DESC"
		);
		return res.status(StatusCodes.OK).json({ questions });
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

module.exports = { allQuestions, singleQuestion, questionPost };
