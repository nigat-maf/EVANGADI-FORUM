let express = require("express");
let router = express.Router();
let authMiddleware = require("../middleware/authMiddleWare");
// user controllers
let { register, login, checkUser } = require("../controller/userController");
// register route
router.post("/register", register);
// login route
router.post("/login", login);
// check user route
router.get("/check", authMiddleware, checkUser);
module.exports = router;
