

Post   /auth/register
Post   /auth/login
POST   /admin/events
POST   /students/register
PUT    /students/attendance/:id
PUT    /students/feedback/:id
GET    /reports/events/popularity
GET    /reports/events/attendance
GET    /reports/events/feedback
GET    /reports/students/participation




```
college-event-management
├─ package.json
├─ README.md
├─ server.js
└─ src
   ├─ app.js
   ├─ config
   │  └─ supabaseClient.js
   ├─ controllers
   │  ├─ adminController.js
   │  ├─ authController.js
   │  ├─ eventController.js
   │  ├─ reportController.js
   │  └─ studentController.js
   ├─ Middleware
   │  └─ verifyAdmin.js
   ├─ routes
   │  ├─ adminRoutes.js
   │  ├─ authRoutes.js
   │  ├─ eventRoutes.js
   │  ├─ reportRoutes.js
   │  └─ studentRoutes.js
   └─ utils
      └─ errorHandler.js

```