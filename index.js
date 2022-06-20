const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const JwtKey = "e-comm";

const app = express(); // express function execution
app.use(express.json()); // data conversion in JSON
app.use(cors());

app.post("/register", async (request, response) => {
  let user = new User(request.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  response.send(result);
});

app.post("/login", async (request, response) => {
  if (request.body.password && request.body.email) {
    let user = await User.findOne(request.body).select("-password");
    if (user) {
      response.send(user);
      // JWT token
      // Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
      //   if (err) {
      //     console.log("Something erong, Please try after sometime");
      //   } else {
      //     response.send({ user, auth: token });
      //   }
      // });
    } else {
      response.send({ result: "No user found" });
    }
  } else {
    response.send({ result: "No user found" });
  }
});

app.post("/add-product", async (request, response) => {
  let product = new Product(request.body);
  let result = await product.save();
  response.send(result);
});

app.get("/products", async (request, response) => {
  let products = await Product.find();
  if (products.length > 0) {
    response.send(products);
  } else {
    response.send({ result: "No product found" });
  }
});

app.delete("/products/:id", async (request, response) => {
  const result = await Product.deleteOne({ _id: request.params.id });
  response.send(result);
});

app.get("/products/:id", async (request, response) => {
  const result = await Product.findOne({ _id: request.params.id });
  if (result) {
    response.send(result);
  } else {
    response.send({ result: "No record found" });
  }
});

app.put("/products/:id", async (request, response) => {
  const result = await Product.updateOne(
    { _id: request.params.id },
    { $set: request.body }
  );
  response.send(result);
});

// seach api
app.get("/search/:key", async (request, response) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: request.params.key } },
      { price: { $regex: request.params.key } },
      { category: { $regex: request.params.key } },
      { company: { $regex: request.params.key } },
    ],
  });
  response.send(result);
});

app.listen(5000);
