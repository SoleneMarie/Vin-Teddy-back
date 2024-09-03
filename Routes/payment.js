const express = require("express");
const router = express.Router();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY_SECRET);

const app = express();
app.use(cors());
app.use(express.json());

router.post("/payment", async (req, res) => {
  try {
    await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: req.body.currency,
      description: req.body.description,
    });
    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
