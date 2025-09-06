// src/controllers/studentController.js
import supabase from "../config/supabaseClient.js";

/**
 * 🔹 Helper: Get logged-in student's numeric ID from token
 */
const getStudentIdFromToken = async (token) => {
  if (!token) throw new Error("No token provided");

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError) throw new Error("Auth error: " + authError.message);

  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("student_id")
    .eq("auth_id", user.id)
    .single();

  if (studentError) throw new Error("Student lookup error: " + studentError.message);
  if (!student) throw new Error("No student profile found for this user");

  return student.student_id;
};

/**
 * 🔹 Register Student to Event
 */
export const registerStudent = async (req, res) => {
  try {
    const { event_id } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    const student_id = await getStudentIdFromToken(token);

    const { data, error } = await supabase
      .from("registrations")
      .insert([{ event_id, student_id }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json({
      message: "Registered successfully",
      registration: data[0]
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * 🔹 Mark Attendance (only for owner)
 */
export const markAttendance = async (req, res) => {
  try {
    const { reg_id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    const student_id = await getStudentIdFromToken(token);

    const { data, error } = await supabase
      .from("registrations")
      .update({ attendance: true })
      .eq("reg_id", reg_id)
      .eq("student_id", student_id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0)
      return res.status(403).json({ error: "Not allowed to mark this attendance" });

    res.json({
      message: "Attendance marked",
      registration: data[0]
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * 🔹 Submit Feedback (only for owner)
 */
export const submitFeedback = async (req, res) => {
  try {
    const { reg_id } = req.params;
    const { feedback } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    const student_id = await getStudentIdFromToken(token);

    const { data, error } = await supabase
      .from("registrations")
      .update({ feedback })
      .eq("reg_id", reg_id)
      .eq("student_id", student_id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0)
      return res.status(403).json({ error: "Not allowed to submit feedback" });

    res.json({
      message: "Feedback submitted",
      registration: data[0]
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
