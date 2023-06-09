const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { contactnumber = null, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ contactnumber: contactnumber }, { email: email }],
    }).select("-orders -cart");

    if (!user) {
      return res.status(400).send("Inavlid Credentials");
    }

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid Password");
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    user.password = undefined;

    const token = jwt.sign(payload, "secret", {
      expiresIn: 1000000,
    });
    res.cookie("token", token, { expiresIn: 1000000 });
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, contactnumber, password } = req.body;

    const user = await User.findOne({
      $or: [{ contactnumber: contactnumber }, { email: email }],
    }).select("-orders -cart -address");

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);

      const new_user = new User({
        name,
        email,
        contactnumber,
        password: hashedpassword,
        cart: [],
        designation: "customer",
      });

      await new_user.save();

      return res
        .status(200)
        .json({ message: "user_registered_successfully", user: new_user });
    } else {
      return res.status(200).json({ message: "user_already_registered" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: JSON.stringify(err) });
  }
};

exports.getprofle = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select(
      "-password -designation"
    );

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: JSON.stringify(err) });
  }
};

exports.editprofle = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select("-password");
    const { address } = req.body;

    user.address = address;
    await user.save();
    return res.status(200).json({ message: "address updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: JSON.stringify(err) });
  }
};

exports.getallusers = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.user.id }).select("-password");

    if (admin.designation === "admin") {
      const users = await User.find({ designation: "customer" }).select(
        "-password -cart"
      );
      return res.status(200).json({ users });
    } else {
      return res.status(200).json({ messsage: "access_denied" });
    }
  } catch (err) {
    console.log(err);
  }
};
