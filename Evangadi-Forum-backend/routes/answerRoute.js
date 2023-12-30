let express = require("express");
let router = express.Router();

router.get("/all-answers", (req, res) => {
	res.send("all answers");
});
module.exports = router;
