import supabase from "../config/supabaseClient.js";

// Event Popularity
export const eventPopularity = async (req, res) => {
  const { data, error } = await supabase
    .from("registrations")
    .select("event_id, count:reg_id")
    .group("event_id");

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Attendance %
export const attendanceReport = async (req, res) => {
  const { data, error } = await supabase
    .rpc("event_attendance_report"); // ✅ corrected RPC name

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Average Feedback
export const feedbackReport = async (req, res) => {
  const { data, error } = await supabase
    .rpc("event_feedback_report"); // ✅ corrected RPC name

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Student Participation
export const studentParticipation = async (req, res) => {
  const { data, error } = await supabase
    .from("registrations")
    .select("student_id, count:reg_id")
    .group("student_id");

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
