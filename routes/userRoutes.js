const express = require('express');
const { registerUser, login, logout, forgotPassword, resetPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser)
router.post("/login", login)
router.get("/logout", logout)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset", resetPassword)
module.exports = router;