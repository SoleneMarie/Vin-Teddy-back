const mongoose = require("mongoose");
const User = require("../Models/Usercount-model");
const express = require("express");

const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const convertPicture = async (req, res, next) => {
  const picData = req.files.productImage;
  req.picData64 = `data : ${picData.mimetype}; base64,${picData.data.toString(
    "base64"
  )}`;
  next();
};

module.exports = convertPicture;
