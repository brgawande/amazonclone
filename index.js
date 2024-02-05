const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const { errorMiddlewares } = require("./middlewares/errorMiddleares");
const cookieParser = require("cookie-parser");
dotenv.config({
  path: "./config/config.env",
});
const PORT = process.env.PORT || 4000;
connectdb();

// app.use("/", (req, res) => {
//   res.send("Our Server is running");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use(errorMiddlewares);
