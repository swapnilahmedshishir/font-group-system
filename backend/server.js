const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for font groups
let fontGroups = [];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Font Group System API",
    result: "Server is Running",
    status: res.statusCode,
  });
});

// Routes
app.post("/api/font-groups", (req, res) => {
  const { action, group, id } = req.body;

  switch (action) {
    case "create":
      if (!group || group.length < 2) {
        return res.json({
          status: "error",
          message: "You must select at least two fonts.",
        });
      }
      const groupId = Date.now().toString();
      fontGroups.push({ id: groupId, fonts: group });

      return res.json({ status: "success", fontGroups });

    case "delete":
      fontGroups = fontGroups.filter((g) => g.id !== id);
      return res.json({ status: "success", fontGroups });

    case "getGroups":
      return res.json({ status: "success", fontGroups });

    default:
      return res.json({ status: "error", message: "Invalid action." });
  }
});

// File Upload Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt !== ".ttf") {
      return cb(new Error("Only TTF files are allowed"));
    }
    cb(null, true);
  },
});

// Upload Endpoint
app.post("/api/upload", upload.single("fontFile"), (req, res) => {
  if (!req.file) {
    return res.json({
      status: "error",
      message: "No file uploaded or invalid file type.",
    });
  }

  res.json({
    status: "success",
    fontId: `font_${Date.now()}`,
    fontName: path.parse(req.file.originalname).name,
    fontPath: `/uploads/${req.file.filename}`,
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
