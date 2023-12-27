const mongoose = require("mongoose");

const connectdb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "amazonclone",
    })
    .then((c) => console.log(`Database connected on host ${c.connection.host}`))
    .catch((e) => console.log("error"));
};

module.exports = connectdb;
