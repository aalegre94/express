const Product = require("../models/product");
// /admin/add-product => GET
exports.getAddProduct = (req, res, next) => {
  res.render("admin/editar-producto", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
// /admin/products => GET
exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/productos", {
        pageTitle: "Admin Productos",
        path: "/admin/products",
        productos: products,
      });
    })
    .catch((err) => console.error(err));
};

// /admin/add-product => POST
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // 1ra Forma - Usando el objeto user recuperado de req.user en el midleware
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id,
  // })
  //   .then((resultado) => {
  //     // console.log(resultado);
  //     console.log("Product creado");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  // 2da Forma - Usando los metodos magicos de sequelize por las asociaciones
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((resultado) => {
      console.log("Product creado");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error(err);
    });
};

// /admin/edit-product/:productID?edit=true => GET
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const proId = req.params.productId;
  req.user
    .getProducts({ where: { id: proId } })
    // Product.findByPk(proId)
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/editar-producto", {
        pageTitle: `Edit Product - ${product.title}`,
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.error(err);
    });
  // Product.findById(proId)
  //   .then(([product]) => {
  //     if (!product) {
  //       return res.redirect("/");
  //     }
  //     res.render("admin/editar-producto", {
  //       pageTitle: "Edit Product",
  //       path: "/admin/edit-product",
  //       editing: editMode,
  //       product: product[0],
  //     });
  //   })
  //   .catch((err) => console.error);
};

exports.postEditProduct = (req, res, next) => {
  const proId = req.body.id;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updateDescription = req.body.description;
  Product.findByPk(proId)
    .then((product) => {
      product.title = updateTitle;
      product.price = updatePrice;
      product.imageUrl = updateImageUrl;
      product.description = updateDescription;
      return product.save();
    })
    .then((resultado) => {
      console.log("Producto actualizado");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error);
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((resultado) => {
      console.log("Producto eliminado");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
