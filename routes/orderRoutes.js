const express = require('express');
const { getAllOrders, myOrders, getSingleOrder, newOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const router = express.Router();


router.post("/new-order", isAuthenticatedUser, newOrder)
router.get("/my-orders", isAuthenticatedUser, myOrders)
router.get("/admin", isAuthenticatedUser, authorizeRole("admin"), getAllOrders)
router.get("/:id", getSingleOrder)
router.delete("/delete/:id", deleteOrder)
router.put("/update/:id", isAuthenticatedUser, authorizeRole("admin"), updateOrder)


module.exports = router;