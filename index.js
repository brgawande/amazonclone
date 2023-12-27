const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/config.env",
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
