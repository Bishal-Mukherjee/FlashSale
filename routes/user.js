const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getprofle,
  editprofle,
  getallusers,
} = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/login", login);

router.post("/register", register);

router.get("/profile", auth, getprofle);

router.put("/editprofile", auth, editprofle); // edit user details, mostly to add address

router.get("/getallusers", auth, getallusers);

module.exports = router;
