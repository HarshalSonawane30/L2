import express from "express";
import {
	signup,
	login,
	logout,
	getProfile,
	updateProfile,
	deleteAccount,
	getUserById,
	getAllUsers,
	resetPassword,
	changePassword
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// current user
router.get("/me", auth, getProfile);
router.put("/me", auth, updateProfile);
router.delete("/me", auth, deleteAccount);

// password management
router.post("/reset-password", resetPassword);
router.post("/change-password", auth, changePassword);

// users listing and by id (protected)
router.get("/", auth, getAllUsers);
router.get("/:userId", auth, getUserById);


export default router;