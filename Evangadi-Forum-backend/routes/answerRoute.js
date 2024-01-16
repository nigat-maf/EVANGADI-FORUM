let express = require("express");
let router = express.Router();
let { allAnswers, answerPost } = require("../controller/answerController");

router.get("/:questionid", allAnswers);
router.post("/:questionid", answerPost);
module.exports = router;
