let express = require("express");
let router = express.Router();
let {
	allQuestions,
	singleQuestion,
	questionPost,
} = require("../controller/questionController");
// all question rout
router.get("/all-questions", allQuestions);
// single question rout
router.get("/:questionid", singleQuestion);
// question post route
router.post("/post-question", questionPost);
module.exports = router;
