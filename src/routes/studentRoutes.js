import { Router } from "express";
import { registerStudent, markAttendance, submitFeedback } from "../controllers/studentController.js";

const router = Router();

// Register for event
router.post("/register", registerStudent);

// Mark attendance (by registration ID)
router.put("/attendance/:id", markAttendance);

// Submit feedback (by registration ID)
router.put("/feedback/:id", submitFeedback);

export default router;
