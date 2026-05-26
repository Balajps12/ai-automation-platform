const express = require("express");

const fs = require("fs");

const path = require("path");

const app = express();

const PORT = 3000;

app.use(express.static("dashboard"));

function getRandomScore() {

  return Math.floor(
    Math.random() * 30
  ) + 70;
}

app.get("/api/dashboard", (req, res) => {

  try {

    const folderPath =
      "outputs/self-improving-system";

    const files = fs.readdirSync(folderPath);

    const outputs = {};

    files.forEach(file => {

      const content = fs.readFileSync(
        path.join(folderPath, file),
        "utf-8"
      );

      outputs[file] = content;
    });

    const analytics = {

      campaignScore: getRandomScore(),

      engagementScore: getRandomScore(),

      optimizationScore: getRandomScore(),

      agentHealth: "Operational",

      generatedFiles: files.length,
    };

    res.json({

      analytics,
      outputs
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(PORT, () => {

  console.log(
    `🚀 Dashboard running at http://localhost:${PORT}`
  );
});