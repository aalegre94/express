const Product = require("../models/product");
const Order = require("../models/order");
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
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/carro", {
            pageTitle: "Carrito",
            path: "/cart",
            products: products,
          });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
// /cart => POST
exports.postCart = (req, res, next) => {
  const proId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: proId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(proId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
};
// /cart-delete-item => POST
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((resultado) => {
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
};
// /orders => GET
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Ordenes",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
// /orders => POST
exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.error(err);
    });
};
// /checkout => GET
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
