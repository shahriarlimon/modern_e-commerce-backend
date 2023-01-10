const e = require('express');
const express = require('express');
const { registerUser, login, logout, forgotPassword, resetPassword, getAllUsers, getUserDetails, getSingleUser, deleteUser, updateUserRole, updateUserProfile, updatePassword } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerUser)
router.post("/login", login)
router.get("/logout", logout)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset", resetPassword)
router.get("/", isAuthenticatedUser, getAllUsers)
router.get("/me", isAuthenticatedUser, getUserDetails)
router.put("/update-profile", isAuthenticatedUser, updateUserProfile)
router.put("/password/update", isAuthenticatedUser, updatePassword)
router.get("/:id", isAuthenticatedUser, getSingleUser)
router.delete("/:id", deleteUser)
router.put("/role/:id", updateUserRole)
module.exports = router;