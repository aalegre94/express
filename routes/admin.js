const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log("En otro midleware");
  res.send("");
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
