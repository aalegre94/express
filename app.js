const express = require("express");
const morgan = require("morgan");
const app = express();

//Para ver el estado del request
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/", (req, res, next) => {
  console.log("En otro midleware");
  res.send("<h1>Hola desde Express bebecita</h1>");
});

app.listen(3000);
