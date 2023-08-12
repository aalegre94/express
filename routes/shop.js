const express = require("express");
const rootDir = require("../util/path");
const path = require("path");
const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { pageTitle: "Shop", path: "/", productos: products });
});

module.exports = router;
