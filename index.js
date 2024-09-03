const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const userSignUp = require("./Routes/user-sign-up");
app.use(userSignUp);
const userLogin = require("./Routes/user-login");
app.use(userLogin);
const offerPublish = require("./Routes/offer-publish");
app.use(offerPublish);
const offerLookFor = require("./Routes/offer-lookfor");
app.use(offerLookFor);
const offerId = require("./Routes/offer-id");
app.use(offerId);
const payment = require("./Routes/payment");
app.use(payment);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Ok");
});
