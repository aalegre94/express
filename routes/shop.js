const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("En otro midleware");
  res.send("<h1>Hola desde Express bebecita</h1>");
});

module.exports = router;
