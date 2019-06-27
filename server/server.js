const mongoose = require("mongoose");
const express = require("express");
let cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");

// Routes
const user = require("./routes/user");

const API_PORT = 3001;

const app = express();

app.use(cors());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
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

app.use("api/user", user);

const port = process.env.PORT || API_PORT;

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
