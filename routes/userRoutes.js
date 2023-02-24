
const express = require('express');
const { registerUser, login, logout, forgotPassword, resetPassword, getAllUsers, getUserDetails, getSingleUser, deleteUser, updateUserRole, updateUserProfile, updatePassword } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerUser)
router.post("/login", login)
router.get("/logout", isAuthenticatedUser, logout)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset", resetPassword)
router.get("/admin", isAuthenticatedUser, authorizeRole("admin"), getAllUsers)
router.get("/me", isAuthenticatedUser, getUserDetails)
router.put("/update-profile", isAuthenticatedUser, updateUserProfile)
router.put("/password/update", isAuthenticatedUser, updatePassword)
router.get("/:id", isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
router.put("/role/:id", isAuthenticatedUser, authorizeRole("admin"), updateUserRole)
router.delete("/:id", isAuthenticatedUser, authorizeRole("admin"), deleteUser)

module.exports = router;