const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const {
  placeorder,
  getorders,
  getcart,
  addtocart,
} = require("../controllers/order");

// cart
router.post("/addtocart", auth, addtocart);
router.delete("/removefromcart", auth, addtocart);
router.get("/getcart", auth, getcart);

// order
router.post("/placeorder", auth, placeorder);
router.get("/getorders", auth, getorders);

module.exports = router;
