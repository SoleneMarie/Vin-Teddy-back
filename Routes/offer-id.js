const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Offer = require("../Models/Offers-model");
// créer une petite fonction pour vérifier que l'id est bien au format mongo db : 24 de long, chiffres de 0 à 9
router.get("/offers/:id", async (req, res) => {
  try {
    let idVerif = req.params.id;
    gotOffer = await Offer.findById(idVerif);
    if (gotOffer) {
      res.status(200).json(gotOffer);
    } else {
      res.status(400).json({ message: "Enter a valid ID" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
