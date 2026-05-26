require("dotenv").config();

const fs = require("fs");

const readline = require("readline-sync");

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

async function run() {

  console.log(`
Choose Content Type:

1. LinkedIn Post
2. Instagram Caption
3. Cold Email
4. TikTok Hook
5. YouTube Title
`);

  const choice = readline.question("Enter choice number: ");

  const topic = readline.question("\nEnter topic: ");

  let prompt = "";
  let folder = "";

  switch(choice) {

    case "1":

      folder = "linkedin";

      prompt = `
      Write a professional LinkedIn post about ${topic}.

      Include:
      - strong hook
      - insights
      - CTA

      Tone:
      Professional and engaging.
      `;
      break;

    case "2":

      folder = "instagram";

      prompt = `
      Write an engaging Instagram caption about ${topic}.

      Include:
      - emojis
      - CTA
      - hashtags
      `;
      break;

    case "3":

      folder = "emails";

      prompt = `
      Write a cold outreach email about ${topic}.

      Keep it:
      - concise
      - persuasive
      - professional
      `;
      break;

    case "4":

      folder = "tiktok";

      prompt = `
      Write 5 viral TikTok hooks about ${topic}.

      Make them:
      - curiosity-driven
      - engaging
      - short
      `;
      break;

    case "5":

      folder = "youtube";

      prompt = `
      Generate 10 viral YouTube titles about ${topic}.
      `;
      break;

    default:

      console.log("❌ Invalid choice.");
      return;
  }

  console.log("\n🤖 Generating content...\n");

  ensureFolderExists(`outputs/${folder}`);

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const content = response.choices[0].message.content;

  console.log(content);

  const filename = topic
    .replace(/\s+/g, "-")
    .toLowerCase();

  fs.writeFileSync(
    `outputs/${folder}/${filename}.txt`,
    content
  );

  console.log(`\n✅ Saved to outputs/${folder}/${filename}.txt`);
}

run();