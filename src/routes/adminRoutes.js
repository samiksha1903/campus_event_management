import express from "express";
import {
  getAllEvents,
  addEvent,
  getAllRegistrations,
  getAllStudents,
  updateStudent,
  deleteStudent,
  addStudent,
  getAllColleges,
  addCollege,
} from "../controllers/adminController.js";

const router = express.Router();

// EVENTS
router.get("/events", getAllEvents);
router.post("/events", addEvent);

// REGISTRATIONS
router.get("/registrations", getAllRegistrations);

// STUDENTS
router.get("/students", getAllStudents);
router.post("/students", addStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

// COLLEGES
router.get("/colleges", getAllColleges);
router.post("/colleges", addCollege);

export default router;
