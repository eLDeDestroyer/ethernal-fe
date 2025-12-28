import fs from 'fs';
import path from 'path';
import { generateQuestionPrompt } from './src/utils/aiPrompts.js';

// Load env manually to avoid dependencies
const envPath = path.resolve(process.cwd(), '.env');
let apiKey = null;
try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/VITE_GROQ_API_KEY=(.*)/);
    apiKey = match ? match[1].trim() : null;
} catch (e) {
    console.error("Could not read .env file");
}

if (!apiKey) {
    console.error("API Key not found in .env");
    process.exit(1);
}

const topics = ["statistika", "peluang dan kaidah pencacahan", "baris dan deret", "sistem persamaan garis lurus dan linear"];
const difficulty = "medium";
const count = 1;

async function runTest(topic) {
    console.log(`\nTesting Topic: ${topic}`);
    const prompt = generateQuestionPrompt(topic, difficulty, count);

    const payload = {
        messages: [{ role: "user", content: prompt }],
        // Using a standard high-quality model available on Groq
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
    };

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error(`API Error: ${response.statusText}`);
            const err = await response.text();
            console.error(err);
            return;
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;
        console.log("Snippet of response:");
        console.log(content.substring(0, 500) + "...");

        const hasDoubleBackslash = content.includes("\\\\(");
        const hasSingleBackslash = content.includes("\\(");
        const hasDollar = content.includes("$");

        if (hasDoubleBackslash) {
            console.log("PASS: Found double backslash parenthesis delimiter");
        } else if (hasSingleBackslash) {
            console.log("WARN: Found single backslash parenthesis delimiter");
        } else if (hasDollar) {
            console.log("FAIL: Found $ delimiters");
        } else {
            console.log("FAIL: No obvious LaTeX delimiters found");
        }

    } catch (e) {
        console.error(e);
    }
}

// Run for all topics
async function runAll() {
    for (const topic of topics) {
        await runTest(topic);
    }
}

runAll();

