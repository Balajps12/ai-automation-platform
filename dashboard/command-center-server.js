const express = require("express");

const cors = require("cors");

const fs = require("fs");

const path = require("path");

const app = express();

app.use(cors());

app.use(express.static("dashboard"));

const PORT =
  process.env.PORT || 5000;

// ROOT ROUTE

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "command-center.html"
    )
  );
});

// READ FILES FROM FOLDERS

function readFolder(folderPath) {

  try {

    const files =
      fs.readdirSync(folderPath);

    return files.map(file => ({

      file,

      content: fs.readFileSync(
        path.join(
          folderPath,
          file
        ),
        "utf-8"
      )
    }));

  } catch (error) {

    console.log(error.message);

    return [];
  }
}

// API

app.get(
  "/api/command-center",
  (req, res) => {

    const data = {

      campaigns:
        readFolder(
          "outputs/optimized-campaigns"
        ),

      analytics:
        readFolder(
          "outputs/performance-reports"
        ),

      crm: {

        totalLeads: 2,

        highPriority: 1,

        followUpsGenerated: 2,
      },

      system: {

        aiAgentsActive: 8,

        workflowsRunning: 5,

        systemHealth:
          "Operational",
      }
    };

    res.json(data);
  }
);

// START SERVER

app.listen(PORT, () => {

  console.log(
    `🚀 Command Center running on port ${PORT}`
  );
});