require("dotenv").config();

const { GoogleSpreadsheet } =
  require("google-spreadsheet");

const { JWT } =
  require("google-auth-library");

const taskRouterAgent =
  require("./agents/task-router-agent");

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

    const score =
      row.get("Lead Score");

    console.log(
      `🤖 Routing ${row.get("Name")}`
    );

    try {

      const action =
        await taskRouterAgent(score);

      row.set(
        "Next Action",
        action
      );

      await row.save();

      console.log(
        `✅ Action assigned: ${action}`
      );

    } catch (error) {

      console.log(
        `❌ Failed for ${row.get("Name")}`
      );

      console.log(error.message);
    }
  }

  console.log(
    "\n🎉 Task routing complete."
  );
}

run();