import express from "express";
import {
  studentRegister,
  studentLogin,
  getProfile,
  adminRegister,
  adminLogin,
  getAdminProfile
} from "../controllers/authController.js";

const router = express.Router();

// -------------------
// Student Routes
// -------------------
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);
router.get("/student/profile", getProfile);

// -------------------
// Admin Routes
// -------------------
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/profile", getAdminProfile);

export default router;
