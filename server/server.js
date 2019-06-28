const mongoose = require("mongoose");
const express = require("express");
let cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");

// Routes
const users = require("./routes/api/users");
const trades = require("./routes/api/trades");
const tasks = require("./routes/api/tasks");

const API_PORT = 3001;

const app = express();

app.use(cors());

const uri = "mongodb+srv://PJ:PJ123@cluster0-rpwqh.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Connected to my Mongodb"))
  .catch(error =>
    console.error.bind(console, "Mongodb connection error", error)
  );

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(passport.initialize());

require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/trades", trades);
app.use("/api/tasks", tasks);

const port = process.env.PORT || API_PORT;

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
