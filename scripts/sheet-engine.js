require("dotenv").config();

const fs = require("fs");

const { GoogleSpreadsheet } = require("google-spreadsheet");

const { JWT } = require("google-auth-library");

const creds = require("../google-credentials.json");

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const SHEET_ID = "1QcAHQQyRkxxZWZI1wbvH-HV_35e2JDZbw7fCgSAQoG8";

async function askAI(prompt) {

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.choices[0].message.content;
}

async function run() {

  const serviceAccountAuth = new JWT({

    email: creds.client_email,

    key: creds.private_key,

    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const doc = new GoogleSpreadsheet(
    SHEET_ID,
    serviceAccountAuth
  );

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  const topicsText = fs.readFileSync(
    "prompts/topics.txt",
    "utf-8"
  );

  const topics = topicsText
    .split("\n")
    .filter(topic => topic.trim() !== "");

  for (const topic of topics) {

    console.log(`🤖 Processing: ${topic}`);

    try {

      const linkedin = await askAI(`
      Write a professional LinkedIn post about ${topic}.
      `);

      const imagePrompt = await askAI(`
      Create cinematic AI image prompt about ${topic}.
      `);

      const ugcScript = await askAI(`
      Write viral UGC ad script about ${topic}.
      `);

      const videoPrompt = await askAI(`
      Create cinematic AI video prompt about ${topic}.
      `);

      await sheet.addRow({

        Topic: topic,

        "LinkedIn Post": linkedin,

        "Image Prompt": imagePrompt,

        "UGC Script": ugcScript,

        "Video Prompt": videoPrompt
      });

      console.log(`✅ Added to Google Sheets`);

    } catch (error) {

      console.log(`❌ Failed for: ${topic}`);

      console.log(error.message);
    }
  }

  console.log("\n🎉 Google Sheets AI Pipeline Complete.");
}

run();