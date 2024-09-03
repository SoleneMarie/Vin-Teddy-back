const mongoose = require("mongoose");
const User = require("../Models/Usercount-model");
const express = require("express");

const checkToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).json({ message: "Access denied, please login" });
    }
    const tokenToCheck = req.headers.authorization.replace("Bearer ", "");
    let userKnown = await User.findOne({ token: tokenToCheck });

    if (!userKnown) {
      res.status(400).json({ message: "Access denied, please login" });
    } else {
      req.user = userKnown;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = checkToken;
