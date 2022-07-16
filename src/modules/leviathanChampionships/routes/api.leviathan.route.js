const express = require("express");
const router = express.Router();
const leviathanController = require("../controller/leviathanController")
// 

router.get(
    "/",
    leviathanController.compare
  );

  module.exports = router;
