const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const path = require("path");
const ejsMate = require("ejs-mate");

const app = express();
dotenv.config();

// --- 1. DATABASE CONNECTION ---
// Database Connection using Environment Variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed: " + err.message);
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

// Register
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
                    // 1. Log the error to your VS Code terminal so you can read it
                    console.error("FULL DATABASE ERROR:", err);

                    // 2. Pass the specific error message to the user
                    let userFriendlyError = "Database error";
                    if (err.code === 'ER_DUP_ENTRY') {
                        userFriendlyError = "This email is already registered.";
                    } else {
                        userFriendlyError = err.sqlMessage || "Database error occurred";
                    }

                    return res.render("register", { error: [userFriendlyError] });
                }
                res.redirect("/login");
            }
        );
    } catch (e) {
        res.render("register", { error: ["Registration failed"] });
    }
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

// --- 4. ROUTES: TEST LOGIC ---
app.get("/test", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    // Explicitly set started to false for the initial dashboard view
    res.render("test", { 
        currentUser: req.session.user, 
        started: false, 
        questions: [] 
    });
});

app.post("/start-test", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const userQ = req.session.user.qualification;
    db.query(
        "SELECT * FROM questions WHERE qualification = ? ORDER BY RAND() LIMIT 10",
        [userQ],
        (err, questions) => {
            if (err) return res.send("Database error");
            res.render("test", { questions, started: true });
        }
    );
});


app.post("/submit-test", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const answers = req.body;
    const ids = Object.keys(answers).map(id => Number(id)).filter(id => !isNaN(id));

    if (ids.length === 0) return res.send("No answers submitted");

    // Use '?' placeholders for security
    const sql = "SELECT id, correct_option FROM questions WHERE id IN (?)";

    db.query(sql, [ids], (err, rows) => {
        if (err) {
            console.error(err); // This helps you see the REAL error in your terminal
            return res.send("Database error during scoring");
        }

        let score = 0;
        rows.forEach((q) => {
            // Ensure types match (string vs number)
            if (String(answers[q.id]) === String(q.correct_option)) score++;
        });

        // Insert result into DB
        db.query(
            "INSERT INTO results (user_id, score, total, created_at) VALUES (?,?,?, NOW())",
            [req.session.user.id, score, rows.length],
            (err) => {
                if (err) console.error("Result save error:", err);
                
                // Render the page AFTER the attempt to save (or inside the callback)
                res.render("result", {
                    score: score,
                    total: rows.length,
                    timestamp: new Date(),
                    qualification: req.session.user.qualification,
                });
            }
        );
    });
});


// --- 5. START SERVER ---
app.listen(3000, () => console.log("Server running on http://localhost:3000"));