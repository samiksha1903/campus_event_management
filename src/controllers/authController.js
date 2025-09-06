import supabase from "../config/supabaseClient.js";


// ------------------------
// Admin Registration
// ------------------------
export const adminRegister = async (req, res) => {
  const { email, password, admin_name, role, phone } = req.body;

  // Create admin user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });

  if (authError) return res.status(400).json({ error: authError.message });

  const user = authData.user;

  // Insert admin profile into "admins" table
  const { data: adminData, error: adminError } = await supabase
    .from("admins")
    .insert([{
      auth_id: user.id,
      admin_name,
      role,      // e.g., superadmin, moderator
      phone
    }])
    .select();

  if (adminError) return res.status(400).json({ error: adminError.message });

  res.json({
    message: "Admin registered successfully",
    user: { id: user.id, email: user.email },
    profile: adminData
  });
};

// ------------------------
// Admin Login
// ------------------------
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({
    message: "Admin login successful",
    session: data.session
  });
};

// ------------------------
// Get Admin Profile
// ------------------------
export const getAdminProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).json({ error: error.message });

  // Fetch admin profile from admins table using auth_id
  const { data: adminData, error: adminError } = await supabase
    .from("admins")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (adminError) return res.status(400).json({ error: adminError.message });

  res.json({ auth: user, profile: adminData });
};

// Student Registration (Sign Up)
export const studentRegister = async (req, res) => {
  const { email, password, student_name, college_id, usn, department, year, phone } = req.body;

  // Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });

  if (authError) return res.status(400).json({ error: authError.message });

  const user = authData.user;

  // Insert student profile into "students" table
  const { data: studentData, error: studentError } = await supabase
    .from("students")
    .insert([{
      auth_id: user.id,         // UUID from Supabase Auth
      student_name,
      college_id,
      usn,
      department,
      year,
      phone
    }])
    .select();

  if (studentError) return res.status(400).json({ error: studentError.message });

  res.json({
    message: "Student registered successfully",
    user: { id: user.id, email: user.email },
    profile: studentData
  });
};

// Student Login
export const studentLogin = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({
    message: "Login successful",
    session: data.session
  });
};

// Get Profile
export const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).json({ error: error.message });

  // Fetch student profile from students table using auth_id
  const { data: studentData, error: studentError } = await supabase
    .from("students")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (studentError) return res.status(400).json({ error: studentError.message });

  res.json({ auth: user, profile: studentData });
};
