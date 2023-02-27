
const express = require('express');
const { processPayment, sendApiKey } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.get("/stripeapikey",  sendApiKey)
router.post('/process/payment', isAuthenticatedUser, processPayment)

module.exports = router;