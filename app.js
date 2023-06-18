const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const publicPath = path.join(__dirname, "public");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static(publicPath));
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Server Error" } = err;
  res.status(statusCode).json(message);
});

module.exports = app;
let counter = 0;
let newValue = counter++ * 2;
console.log(newValue);

const objt = {
  showTihs: () => {
    console.dir(this);
  },
};

objt.showTihs();
Promise.reject("Error").finally(console.log).catch(console.log);
