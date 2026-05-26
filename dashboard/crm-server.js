require("dotenv").config();

const express = require("express");

const cors = require("cors");

const { GoogleSpreadsheet } =
  require("google-spreadsheet");

const { JWT } =
  require("google-auth-library");

const creds =
  require("../google-credentials.json");

const app = express();

app.use(cors());

app.use("/crm", express.static("dashboard"));

const PORT = 4000;

const SHEET_ID =
  "1QcAHQQyRkxxZWZI1wbvH-HV_35e2JDZbw7fCgSAQoG8";

async function getLeads() {

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

  return rows.map(row => ({

    name: row.get("Name"),

    company: row.get("Company"),

    role: row.get("Role"),

    email: row.get("Email"),

    painPoint: row.get("Pain Point"),

    status: row.get("Status"),

    priority: row.get("Priority"),

    lastContact: row.get("Last Contact"),
  }));
}

app.get("/api/leads", async (req, res) => {

  try {

    const leads =
      await getLeads();

    res.json(leads);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});


app.listen(PORT, () => {

  console.log(
    `🚀 CRM running at http://localhost:${PORT}`
  );
});