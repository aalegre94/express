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

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
