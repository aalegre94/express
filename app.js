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
// const sequelize = require("./util/database_dev");
const sequelize = require("./util/database_prod");
// models
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

//Para ver el estado del request
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );
//para ver los request y para servir archivos staticos

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.error(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
// relaciones
// 1 a N
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// 1 a 1
User.hasOne(Cart);
Cart.belongsTo(User);
// N a N
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync({ force: true })
  // .sync()
  .then((resultado) => {
    // console.log(resultado);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({
        name: "Angel",
        email: "alegre.qa@gmail.com",
      });
    }
    return User;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
