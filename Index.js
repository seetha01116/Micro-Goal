require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const errormiddleware = require("./Middlewares/errormiddleware");
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(express.json());
const PORT = process.env.PORT;
const Mongo_Url = process.env.MONGO_URL;
const authRoute = require("./Router/AuthRouter");
const GoalRouter = require("./Router/GoalRouter");

//mongoDB connection
mongoose
  .connect('mongodb://localhost:27017')
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//route
app.use("/", authRoute);
app.use("/", GoalRouter);
app.get("/",(req,res)=>{
  res.send("backend is working");
});
app.post("/register", (req, res) => {
   res.send("User registered");
});
app.post("/", (req, res) => {
   res.send("POST working!");
});


app.use(errormiddleware);
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});

