let express = require("express");
let router = express.Router();

router.get("/all-questions",(req, res) => {
	res.send("all questions");
});
module.exports = router;
