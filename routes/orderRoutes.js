const express = require('express');
const { getAllOrders, myOrders, getSingleOrder, newOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const router = express.Router();
router.get("/admin", isAuthenticatedUser, authorizeRole("admin"), getAllOrders)
router.get("/my-orders", isAuthenticatedUser, myOrders)
router.get("/:id", getSingleOrder)
router.post("/new-order", isAuthenticatedUser, newOrder)
router.put("/update/:id", isAuthenticatedUser, authorizeRole("admin"), updateOrder)
router.delete("/delete/:id", deleteOrder)

module.exports = router;