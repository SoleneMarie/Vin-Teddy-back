const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Offer = require("../Models/Offers-model");
const User = require("../Models/Usercount-model");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const checkToken = require("../middlewares/checkToken");

const convertBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};
router.post("/offer/publish", checkToken, fileUpload(), async (req, res) => {
  try {
    console.log("checkToken");
    const picData = req.files.productImage;
    const {
      product_name,
      product_description,
      product_price,
      product_details,
    } = req.body; // rajouter des sécurités pour que les champs obligatoires soient remplis
    console.log(req.user._id);

    const result = await cloudinary.uploader.upload(convertBase64(picData));
    const newOffer = new Offer({
      product_name: product_name,
      product_description: product_description,
      product_price: product_price,
      product_details: product_details,
      product_image: result.secure_url,
      owner: req.user._id,
    });
    await newOffer.save();
    res.status(201).json({ message: "offer posted successfully" });
    // console.log(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
