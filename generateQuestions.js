// generateQuestions.js
import { config } from "dotenv";
import OpenAI from "openai";
import mysql from "mysql2/promise";

config(); // load .env
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Connect to DB
const pool = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "testifyiq"
});

// function to generate questions
async function generateQuestions(level, qualification) {
  const prompt = `
  Generate 5 ${level} IQ test questions for ${qualification} students.
  Each question must include:
  - question prompt
  - 4 options labeled A,B,C,D
  - correct option letter
  Return JSON array format like:
  [
    {"prompt": "...", "A": "...", "B": "...", "C": "...", "D": "...", "correct": "A"}
  ]
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  const text = response.choices[0].message.content;
  const questions = JSON.parse(text);

  for (const q of questions) {
    await pool.execute(
      `INSERT INTO questions (qualification, difficulty, prompt, option_a, option_b, option_c, option_d, correct)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [qualification, level, q.prompt, q.A, q.B, q.C, q.D, q.correct]
    );
  }

  console.log(`Inserted ${questions.length} ${level} questions for ${qualification}.`);
}

await generateQuestions("Easy", "Matric");
await generateQuestions("Medium", "Intermediate");
await generateQuestions("Hard", "Graduation");
await generateQuestions("Advanced", "Graduation");

console.log("✅ All questions generated and saved!");
process.exit(0);
