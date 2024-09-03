const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/Usercount-model");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const passwordToTest = SHA256(req.body.password + user.salt).toString(
      encBase64
    );

    if (passwordToTest === user.hash) {
      res.status(200).json({
        _id: user._id,
        token: user.token,
        account: {
          username: user.account.username,
        },
      });
    } else {
      return res.status(200).json({ error: "username or password incorrect" });
    }
  } catch (error) {}
});

module.exports = router;
