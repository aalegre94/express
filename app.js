const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

//Para ver el estado del request
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/add-product", (req, res, next) => {
  console.log("En otro midleware");
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Add Producto</button></form>"
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("En otro midleware");
  res.send("<h1>Hola desde Express bebecita</h1>");
});

app.listen(3000);
