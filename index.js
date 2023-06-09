const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://bishal123:68Bq5fqvFEGyT50Q@cluster0.wbhdp6r.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    console.log("database connection");
  })
  .catch((err) => {
    console.log("database error");
    console.log(err);
  });

app.get("/", (req, res) => {
  return res.status(200).json({ message: "SERVER WORKING" });
});

const PORT = process.env.PORT || 8080;

app.use("/api/users", require("./routes/user"));
app.use("/api/orders", require("./routes/order"));

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
