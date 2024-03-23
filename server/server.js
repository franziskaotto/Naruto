
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const characterRoute = require("./routes/character.route");

const { MONGO_URL, PORT = 8080} = process.env;

if(!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use("/api/characters", characterRoute);



const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`server is listening on Port http://127.0.0.1:${PORT}/`);
    console.log("Try /api/characters route right now");
  })

}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});








