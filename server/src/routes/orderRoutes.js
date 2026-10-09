const express = require("express");
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, getDashboardStats, getMyOrders, getOrderById } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/", protect, admin, getOrders);
router.get("/stats", protect, admin, getDashboardStats);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;