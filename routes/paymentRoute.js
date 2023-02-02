
const express = require('express');
const { processPayment, sendApiKey } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/process/payment', isAuthenticatedUser, processPayment)
router.get("/stripeapikey", isAuthenticatedUser, sendApiKey)
module.exports = router;