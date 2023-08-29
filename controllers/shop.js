const Product = require("../models/product");
const Cart = require("../models/cart");
// const { where } = require("sequelize");

// / => GET
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        productos: products,
      });
    })
    .catch((err) => console.error(err));
};
// /products => GET
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/lista-de-productos", {
        pageTitle: "Productos",
        path: "/products",
        productos: products,
      });
    })
    .catch((err) => console.error(err));
  (products) => {};
};
// /products/:productID => GET
exports.getProduct = (req, res, next) => {
  const proId = req.params.productId;
  Product.findByPk(proId)
    .then((product) => {
      res.render("shop/detalle-del-producto", {
        pageTitle: product.title,
        product: product,
        path: "/product",
      });
    })
    .catch((err) => console.error(err));
  //solucion con where
  // Product.findAll({ where: { id: proId } })
  //   .then((products) => {
  //     res.render("shop/detalle-del-producto", {
  //       pageTitle: products[0].title,
  //       product: products[0],
  //       path: "/product",
  //     });
  //   })
  //   .catch((err) => console.error(err));
};
// /cart => GET
exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const carroProductos = [];
      for (product of products) {
        const carroProductoData = cart.products.find(
          (prod) => prod.id === product.id
        );

        if (carroProductoData) {
          carroProductos.push({
            productData: product,
            qty: carroProductoData.qty,
          });
        }
      }
      res.render("shop/carro", {
        pageTitle: "Carrito",
        path: "/cart",
        products: carroProductos,
      });
    });
  });
};
// /cart => POST
exports.postCart = (req, res, next) => {
  const proId = req.body.productId;
  Product.findById(proId, (product) => {
    Cart.addProduct(proId, product.price);
  });
  res.redirect("/cart");
};
// /cart-delete-item => POST
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
// /orders => GET
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Ordenes", path: "/orders" });
};
// /checkout => GET
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
