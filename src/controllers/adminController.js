import supabase from "../config/supabaseClient.js";

// ----------------- EVENTS -----------------

// Get all events
export const getAllEvents = async (req, res) => {
  const { data, error } = await supabase.from("events").select(`
    event_id,
    event_name,
    event_type,
    event_date,
    colleges (college_name)
  `);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Add a new event
export const addEvent = async (req, res) => {
  const { college_id, event_name, event_type, event_date } = req.body;

  const { data, error } = await supabase
    .from("events")
    .insert([{ college_id, event_name, event_type, event_date }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Event added successfully", event: data[0] });
};

// ----------------- REGISTRATIONS -----------------

// Get all registrations
export const getAllRegistrations = async (req, res) => {
  const { data, error } = await supabase
    .from("registrations")
    .select(`
      reg_id,
      attendance,
      feedback,
      students (
        student_name, usn, department, year, phone
      ),
      events (
        event_name, event_type, event_date,
        colleges (college_name)
      )
    `);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// ----------------- STUDENTS -----------------

// Get all students
export const getAllStudents = async (req, res) => {
  const { data, error } = await supabase
    .from("students")
    .select(`
      student_id,
      student_name,
      usn,
      department,
      year,
      phone,
      colleges (college_name)
    `);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Update student
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from("students")
    .update(updates)
    .eq("student_id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Student updated successfully", student: data[0] });
};

// Delete student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("students").delete().eq("student_id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Student deleted successfully" });
};

// Add new student
export const addStudent = async (req, res) => {
  const { student_name, college_id, usn, department, year, phone, auth_id } = req.body;

  const { data, error } = await supabase
    .from("students")
    .insert([{ student_name, college_id, usn, department, year, phone, auth_id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Student added successfully", student: data[0] });
};

// ----------------- COLLEGES -----------------

// Get all colleges
export const getAllColleges = async (req, res) => {
  const { data, error } = await supabase.from("colleges").select("*");

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Add new college
export const addCollege = async (req, res) => {
  const { college_name, location, description } = req.body;

  const { data, error } = await supabase
    .from("colleges")
    .insert([{ college_name, location, description }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "College added successfully", college: data[0] });
};
