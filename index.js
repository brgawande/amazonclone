const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
dotenv.config({
  path: "./config/config.env",
});
const PORT = process.env.PORT || 4000;
connectdb();

app.use("/", (req, res) => {
  res.send("Our Server is running");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
