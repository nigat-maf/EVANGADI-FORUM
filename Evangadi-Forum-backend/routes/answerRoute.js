let express = require("express");
let router = express.Router();
let { allAnswers, answerPost } = require("../controller/answerController");

router.get("/:questionid", allAnswers);
router.post("/post-answer", answerPost);
module.exports = router;
