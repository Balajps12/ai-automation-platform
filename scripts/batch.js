require("dotenv").config();

const fs = require("fs");

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

function ensureFolderExists(folderPath) {

  if (!fs.existsSync(folderPath)) {

    fs.mkdirSync(folderPath, { recursive: true });

    console.log(`📁 Created folder: ${folderPath}`);
  }
}

async function generateContent(topic) {

  try {

    console.log(`\n🤖 Generating: ${topic}`);

    const response = await client.chat.completions.create({

      model: "openrouter/free",

      messages: [
        {
          role: "user",
          content: `
          Write a professional LinkedIn post about ${topic}.

          Include:
          - strong hook
          - actionable insights
          - CTA

          Tone:
          Professional and engaging.
          `
        }
      ]
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.log(`❌ Failed for topic: ${topic}`);

    console.log(error.message);

    return null;
  }
}

async function run() {

  ensureFolderExists("outputs/linkedin");

  const topicsText = fs.readFileSync(
    "prompts/topics.txt",
    "utf-8"
  );

  const topics = topicsText
    .split("\n")
    .filter(topic => topic.trim() !== "");

  for (const topic of topics) {

    const content = await generateContent(topic);

    if (!content) {

      console.log("⏭ Skipping...\n");

      continue;
    }

    const filename = topic
      .replace(/\s+/g, "-")
      .toLowerCase();

    fs.writeFileSync(
      `outputs/linkedin/${filename}.txt`,
      content
    );

    console.log(`✅ Saved: ${filename}.txt`);
  }

  console.log("\n🎉 Batch generation complete.");
}

run();