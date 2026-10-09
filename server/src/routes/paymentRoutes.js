const express = require("express");
const router = express.Router();
const { verifyTransaction } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/verify/:transactionId", protect, verifyTransaction);

module.exports = router;