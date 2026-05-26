require("dotenv").config();

const { GoogleSpreadsheet } =
  require("google-spreadsheet");

const { JWT } =
  require("google-auth-library");

const leadScoringAgent =
  require("./agents/lead-scoring-agent");

const creds =
  require("../google-credentials.json");

const SHEET_ID =
  "1QcAHQQyRkxxZWZI1wbvH-HV_35e2JDZbw7fCgSAQoG8";

async function run() {

  const auth = new JWT({

    email: creds.client_email,

    key: creds.private_key,

    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const doc =
    new GoogleSpreadsheet(
      SHEET_ID,
      auth
    );

  await doc.loadInfo();

  const sheet =
    doc.sheetsByTitle["Leads"];

  const rows =
    await sheet.getRows();

  for (const row of rows) {

    console.log(
      `🤖 Scoring ${row.get("Name")}`
    );

    const lead = {

      name: row.get("Name"),

      company: row.get("Company"),

      role: row.get("Role"),

      painPoint: row.get("Pain Point"),
    };

    try {

      const score =
        await leadScoringAgent(lead);

      row.set(
        "Lead Score",
        score
      );

      await row.save();

      console.log(
        `✅ Score saved: ${score}`
      );

    } catch (error) {

      console.log(
        `❌ Failed for ${lead.name}`
      );

      console.log(error.message);
    }
  }

  console.log(
    "\n🎉 Lead scoring complete."
  );
}

run();