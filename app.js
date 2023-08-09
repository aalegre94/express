const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//Para ver el estado del request
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Pagina no encontrada!!</h1>");
});

app.listen(3000);
