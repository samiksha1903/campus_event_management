import supabase from "../config/supabaseClient.js";

// Create Event
export const createEvent = async (req, res) => {
  const { college_id, event_name, event_type, event_date } = req.body;
  const { data, error } = await supabase
    .from("events")
    .insert([{ college_id, event_name, event_type, event_date }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
