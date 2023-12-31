const Product = require("../models/product");
const Cart = require("../models/cart");

// / => GET
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        productos: rows,
      });
    })
    .catch((err) => console.error(err));
};
// /products => GET
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/lista-de-productos", {
        pageTitle: "Productos",
        path: "/products",
        productos: rows,
      });
    })
    .catch((err) => console.error(err));
  (products) => {};
};
// /products/:productID => GET
exports.getProduct = (req, res, next) => {
  const proId = req.params.productId;
  Product.findById(proId)
    .then(([product]) => {
      res.render("shop/detalle-del-producto", {
        pageTitle: "Detalle",
        product: product[0],
        path: "/product",
      });
    })
    .catch((err) => console.error(err));
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
