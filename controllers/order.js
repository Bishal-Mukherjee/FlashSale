const Users = require("../models/users");

exports.placeorder = async (req, res) => {
  try {
    const { product } = req.body;
    const user = await Users.findOne({ _id: req.user.id });

    user.orders.unshift({
      orderedOn: new Date(),
      product,
      isDelivered: false,
      address: user.address,
    });

    await user.save();
    return res.status(200).json({ message: "order_placed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: JSON.stringify(err) });
  }
};

exports.getorders = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id }).select("orders");
    const { orders } = user;

    return res.status(200).json({ message: "orders_fetched", orders });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: JSON.stringify(err) });
  }
};

exports.addtocart = async (req, res) => {
  try {
    const { product } = req.body;
    const user = await Users.findOne({ _id: req.user.id });

    user.cart.unshift({
      addedOn: new Date(),
      product,
    });

    await user.save();
    return res.status(200).json({ message: "product_added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: JSON.stringify(err) });
  }
};

exports.getcart = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id }).select("cart");
    const { cart } = user;

    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: JSON.stringify(err) });
  }
};
