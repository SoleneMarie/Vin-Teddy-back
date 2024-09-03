const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Offer = require("../Models/Offers-model");
const User = require("../Models/Usercount-model");

router.get("/offers", async (req, res) => {
  // ****** Rajouter le nombre d'éléments trouvés*******
  //---------------tri asc/desc---------------------
  const foundOffers = await Offer.find({
    product_name: "T-shirt réconfortant",
  });
  let value = {};
  //console.log(foundOffers);
  try {
    //console.log(req.query.sort);   => price-desc
    if (req.query.sort) {
      if (req.query.sort === "price-desc") {
        value = { product_price: "desc" }; // ou -1
      } else if (req.query.sort === "price-asc") {
        value = { product_price: "asc" }; // ou 1
      } else if (req.query.sort === "name-asc") {
        value = { product_name: "asc" };
      } else if (req.query.sort === "name-desc") {
        value = { product_name: "desc" };
      }

      // console.log(value);   => {product_price:'desc'}

      //-------------------page en cours et limite par page------------------ OK!
    }
    if (req.query.page) {
      pageNum = req.query.page;
    } else {
      pageNum = 1;
    }
    // console.log(pageNum);
    const pageLim = 5; //A rendre modifiable, avec let + une fonction pour la modifer
    const pageToSkip = pageLim * (pageNum - 1);
    // console.log(pageToSkip);
    //----------------recherche par filtres ---------------- OK!
    //console.log(req.query.title);

    const filters = {};

    if (req.query.title) {
      filters.product_name = new RegExp(req.query.title, "i");

      // console.log(filters.regex);
    }
    //console.log(filters.regex);
    filters.product_price = { $lte: 2000, $gte: 0 };
    if (req.query.priceMax) {
      // clé prix max
      filters.product_price.$lte = Number(req.query.priceMax);
      //filters.priceMax = req.query.priceMax;
    }
    if (req.query.priceMin) {
      // clé prix min
      filters.product_price.$gte = Number(req.query.priceMin);
    }

    //console.log(filters.priceMax);
    //console.log(filters.priceMin);
    //---------------------------------------------------
    console.log("Ca au moins ça marche...");
    //console.log(filters);
    //console.log(Object.keys(filters));
    //---------------------contenu-------------------------

    //---------------gérer les recherches par titre--------------
    const Test1 = await Offer.find(filters);

    foundOffer = await Offer.find(filters) // Rajouter un populate après le find
      .sort(value) // . populate{path:"owner", select:"account"}
      .skip(pageToSkip)
      .limit(pageLim);

    // console.log(value); //{product_price:desc}

    //________________________
    res.status(200).json(foundOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
