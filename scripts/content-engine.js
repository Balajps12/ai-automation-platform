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
  }
}

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

  ensureFolderExists("outputs/linkedin");

  ensureFolderExists("outputs/image-prompts");

  ensureFolderExists("outputs/ugc-scripts");

  ensureFolderExists("outputs/video-prompts");

  const topicsText = fs.readFileSync(
    "prompts/topics.txt",
    "utf-8"
  );

  const topics = topicsText
    .split("\n")
    .filter(topic => topic.trim() !== "");

  for (const topic of topics) {

    console.log(`\n🤖 Processing: ${topic}`);

    try {

      // LINKEDIN POST

      const linkedinPost = await askAI(`
      Write a professional LinkedIn post about ${topic}.

      Include:
      - hook
      - insights
      - CTA

      Tone:
      Professional and engaging.
      `);

      // IMAGE PROMPT

      const imagePrompt = await askAI(`
      Create a cinematic AI image prompt for ${topic}.

      Include:
      - startup aesthetic
      - dramatic lighting
      - realistic environment
      - modern visuals
      `);

      // UGC SCRIPT

      const ugcScript = await askAI(`
      Write a short viral UGC video ad script about ${topic}.

      Structure:
      - Hook
      - Problem
      - Solution
      - CTA

      Style:
      TikTok/Reels style.
      `);

      // VIDEO PROMPT

      const videoPrompt = await askAI(`
      Create a cinematic AI video generation prompt for ${topic}.

      Include:
      - scenes
      - camera movement
      - lighting
      - environment
      - mood
      - realism

      Style:
      startup commercial.
      `);

      const filename = topic
        .replace(/\s+/g, "-")
        .toLowerCase();

      fs.writeFileSync(
        `outputs/linkedin/${filename}.txt`,
        linkedinPost
      );

      fs.writeFileSync(
        `outputs/image-prompts/${filename}.txt`,
        imagePrompt
      );

      fs.writeFileSync(
        `outputs/ugc-scripts/${filename}.txt`,
        ugcScript
      );

      fs.writeFileSync(
        `outputs/video-prompts/${filename}.txt`,
        videoPrompt
      );

      console.log(`✅ Generated full marketing package`);

    } catch (error) {

      console.log(`❌ Failed: ${topic}`);

      console.log(error.message);
    }
  }

  console.log("\n🎉 AI Marketing Engine Complete.");
}

run();