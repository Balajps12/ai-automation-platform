require("dotenv").config();

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

  const sheet = doc.sheetsByTitle["Leads"];

  const rows = await sheet.getRows();

  for (const row of rows) {

    console.log(`\n🤖 Generating outreach for ${row.get("Name")}`);

    try {

      const email = await askAI(`
      Write a personalized cold outreach email.

      Prospect:
      ${row.get("Name")}

      Company:
      ${row.get("Company")}

      Role:
      ${row.get("Role")}

      Pain Point:
      ${row.get("Pain Point")}

      Goal:
      Book a discovery call.

      Tone:
      Friendly, concise, professional.
      `);

      row.set("Outreach Email", email);

      await row.save();

      console.log(`✅ Outreach generated`);

    } catch (error) {

      console.log(`❌ Failed for ${row.get("Name")}`);

      console.log(error.message);
    }
  }

  console.log("\n🎉 Lead generation pipeline complete.");
}

run();