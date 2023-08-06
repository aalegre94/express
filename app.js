const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use((req, res, next) => {
  console.log("En el midleware");
  next();
});

app.use((req, res, next) => {
  console.log("En otro midleware");
  res.send("<h1>Hola desde Express</h1>");
});

app.listen(3000);
