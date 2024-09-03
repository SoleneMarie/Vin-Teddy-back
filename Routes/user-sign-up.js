const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/Usercount-model");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/user/signup", async (req, res) => {
  const userToFind = req.body.username;
  const isItFound = await User.findOne({ account: { username: userToFind } });
  console.log(isItFound);
  try {
    if (!userToFind) {
      res.status(400).json({ message: "Please enter your username" }); // vérifie si le username est renseigné
    } else if (!req.body.email) {
      // on peut aussi mettre des returns plutôt que plusieurs else
      res.status(400).json({ message: "Please enter your email" }); //vérifie si le mail est renseigné
    } else if (isItFound) {
      // vérifie si le username est déjà répertorié
      res
        .status(409) // 409 = statut pour les conflits
        .json({ message: "account already existing for this user" });
    } else {
      const password = req.body.password; // sinon, crée le mot de passe
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);

      const newUser = new User({
        // puis crée l'objet
        email: req.body.email,
        account: {
          username: req.body.username,
          avatar: req.body.avatar,
        },
        newsletter: req.body.newsletter,
        token: token,
        hash: hash,
        salt: salt,
      });
      await newUser.save();
      res.status(201).json({
        _id: newUser.id,
        message: "new account successfully created", // répond à l'utilisateur
        token: token,
        account: {
          username: req.body.username,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
