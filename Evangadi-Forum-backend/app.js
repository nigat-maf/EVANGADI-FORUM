require("dotenv").config();
let express = require("express");
let cors = require("cors");
let rateLimit = require("express-rate-limit");

let app = express();
let port = 5500;
app.use(cors());
// app.use(
// 	rateLimit({
// 		windowMs: 15 * 60 * 1000,
// 		limit: 100,
// 	})
// );

// json middleware
app.use(express.json());
// authentication
let authMiddleware = require("./middleware/authMiddleWare");
// database connection
let dbConnection = require("./model/model");
// user route middleware file
let userRoutes = require("./routes/userRoute");
// user routes middleware
app.use("/api/users", userRoutes);

// question route middleware file
let questionRoutes = require("./routes/questionRoute");
// question route middleware
app.use("/api/questions", authMiddleware, questionRoutes);

// answer route middleware file
let answerRoutes = require("./routes/answerRoute");
// answer route middleware
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
	try {
		let result = await dbConnection.execute("select 'test' ");
		await app.listen(port);
		console.log("database connection established");
		console.log(`server listning at port ${port}`);
	} catch (error) {
		console.log(error);
	}
}
start();
