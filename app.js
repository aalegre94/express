const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

//para que cargue las plantillas ejs y su ubicacion
app.set("view engine", "ejs");
app.set("views", "views");
//importo las rutas
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

//Para ver el estado del request
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
//para ver los request y para servir archivos staticos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
