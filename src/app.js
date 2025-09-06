import express from "express";
import cors from "cors";

// Routes
import eventRoutes from "./routes/eventRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // Student & Admin auth
import adminRoutes from "./routes/adminRoutes.js";
import { verifyAdmin } from "./Middleware/verifyAdmin.js";

const app = express();

// Middleware
app.use(express.json());

// Configure CORS explicitly
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yourfrontenddomain.com"], // frontend URLs allowed
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // allow cookies or Authorization headers
  })
);

// Mount routes
app.use("/auth", authRoutes);       // Student & Admin auth routes
app.use("/events", eventRoutes);
app.use("/students", studentRoutes);
app.use("/reports", reportRoutes);
app.use("/admin", verifyAdmin, adminRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("College Event Management API running ✅");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

export default app;
