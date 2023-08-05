const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("En el midleware");
  next();
});

app.use((req, res, next) => {
  console.log("En otro midleware");
  next();
});

app.listen(3000);
