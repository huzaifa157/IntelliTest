import express from "express";
import mysql from "mysql2";
import session from "express-session";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";

const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql2");
const path = require("path");
const ejsMate = require("ejs-mate");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: "testify-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.render("index");
});

app.set("view engine" , "ejs");
app.engine("ejs" , ejsMate);
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"/public")))


  if (!username || !email || !password || !qualification) {
    return res.render("register", { error: ["All fields are required"] });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users(username, email, password, qualification) VALUES (?,?,?,?)",
    [username, email, hashedPassword, qualification],
    (err) => {
      if (err) return res.render("register", { error: ["Database error"] });
      res.redirect("/login");
    }
  );
});

// Login
app.get("/login", (req, res) => {
  res.render("login", { error: [] });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, rows) => {
    if (err) return res.render("login", { error: ["Database error"] });
    if (rows.length === 0) return res.render("login", { error: ["User not found"] });

    const user = rows[0];
    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) return res.render("login", { error: ["Incorrect password"] });

    req.session.user = user;
    res.redirect("/test");
  });
});
app.get("/test", (req, res) => {
  res.render("test");
});



// Test Page
app.get("/test", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("test", { questions: [], started: false });
});

// Start Test
app.post("/start-test", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const userQ = req.session.user.qualification;

  db.query(
    "SELECT * FROM questions WHERE qualification = ? ORDER BY RAND() LIMIT 10",
    [userQ],
    (err, questions) => {
      if (err) return res.send("Database error");

      console.log("Fetched questions:", questions); // debug log

      res.render("test", { questions, started: true });
    }
  );
});

// Submit Test
app.post("/submit-test", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const answers = req.body;
  const ids = Object.keys(answers);

  if (ids.length === 0) return res.send("No answers submitted");

  const sql = `SELECT id, correct_option FROM questions WHERE id IN (${ids})`;

  db.query(sql, (err, rows) => {
    if (err) return res.send("Database error");

    let score = 0;
    rows.forEach((q) => {
      if (answers[q.id] == q.correct_option) score++;
    });

    db.query(
      "INSERT INTO results (user_id, score, total, created_at) VALUES (?,?,?, NOW())",
      [req.session.user.id, score, rows.length]
    );

    // ✅ FIXED RESULT RENDER — adds timestamp & qualification
    res.render("result", {
      score: score,
      total: rows.length,
      timestamp: new Date(), // <-- IMPORTANT: Added
      qualification: req.session.user.qualification, // <-- Added
    });
  });
});

// Server start
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

