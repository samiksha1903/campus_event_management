import supabase from "../config/supabaseClient.js";

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).json({ error: error.message });

  const { data: adminData, error: adminError } = await supabase
    .from("admins")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (adminError || !adminData) return res.status(403).json({ error: "Access denied" });

  req.admin = adminData;
  next();
};
