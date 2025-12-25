// Load ENV first (ONLY ONCE)
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const path = require("path");
const mysql = require("mysql2");
const ejsMate = require("ejs-mate");

const generateCertificate = require("./utils/certificate");

const app = express();

// --- 1. DATABASE CONNECTION ---
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        return;
    }
    console.log("✅ MySQL Connected Successfully!");
});

// --- 2. MIDDLEWARE & CONFIG ---
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "testify-secret",
        resave: false,
        saveUninitialized: false,
    })
);

// --- 3. ROUTES: HOME & AUTH ---
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register", { error: [] });
});

app.post("/register", async (req, res) => {
    const { username, email, password, qualification } = req.body;

    if (!username || !email || !password || !qualification) {
        return res.render("register", { error: ["All fields are required"] });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            "INSERT INTO users(username, email, password, qualification) VALUES (?,?,?,?)",
            [username, email, hashedPassword, qualification],
            (err) => {
                if (err) {
                    let msg = err.code === "ER_DUP_ENTRY"
                        ? "This email is already registered."
                        : "Database error";
                    return res.render("register", { error: [msg] });
                }
                res.redirect("/login");
            }
        );
    } catch {
        res.render("register", { error: ["Registration failed"] });
    }
});

app.get("/login", (req, res) => {
    res.render("login", { error: [] });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, rows) => {
        if (err || rows.length === 0)
            return res.render("login", { error: ["Invalid credentials"] });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.render("login", { error: ["Invalid credentials"] });

        req.session.user = user;
        res.redirect("/test");
    });
});

// --- 4. TEST ROUTES ---
app.get("/test", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    res.render("test", {
        currentUser: req.session.user,
        started: false,
        questions: []
    });
});

app.post("/start-test", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    db.query(
        "SELECT * FROM questions WHERE qualification = ? ORDER BY RAND() LIMIT 10",
        [req.session.user.qualification],
        (err, questions) => {
            if (err) return res.send("Database error");
            res.render("test", { started: true, questions });
        }
    );
});

app.post("/submit-test", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const answers = req.body;
    const ids = Object.keys(answers).map(Number);

    db.query(
        "SELECT id, correct_option FROM questions WHERE id IN (?)",
        [ids],
        (err, rows) => {
            if (err) return res.send("Scoring error");

            let score = 0;
            rows.forEach(q => {
                if (String(answers[q.id]) === String(q.correct_option)) score++;
            });

            // 🔹 SAVE RESULT IN SESSION FOR CERTIFICATE
            req.session.lastResult = {
                score,
                total: rows.length,
                qualification: req.session.user.qualification
            };

            db.query(
                "INSERT INTO results (user_id, score, total, created_at) VALUES (?,?,?,NOW())",
                [req.session.user.id, score, rows.length]
            );

            res.render("result", {
                score,
                total: rows.length,
                timestamp: new Date(),
                qualification: req.session.user.qualification
            });
        }
    );
});

// --- 5. CERTIFICATE DOWNLOAD ROUTE ---
app.get("/certificate", (req, res) => {
    if (!req.session.user || !req.session.lastResult)
        return res.redirect("/login");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");

    generateCertificate(res, {
        name: req.session.user.username,
        qualification: req.session.lastResult.qualification,
        score: req.session.lastResult.score,
        total: req.session.lastResult.total,
    });
});

// --- 6. START SERVER ---
app.listen(3000, () =>
    console.log("🚀 Server running on http://localhost:3000")
);
