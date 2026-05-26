const fs = require("fs");

const path = require("path");

const performanceAnalyticsAgent =
  require(
    "./agents/performance-analytics-agent"
  );

function ensureFolderExists(folderPath) {

  if (!fs.existsSync(folderPath)) {

    fs.mkdirSync(folderPath, {
      recursive: true
    });
  }
}

async function run() {

  const inputFolder =
    "outputs/optimized-campaigns";

  const outputFolder =
    "outputs/performance-reports";

  ensureFolderExists(outputFolder);

  const files =
    fs.readdirSync(inputFolder);

  for (const file of files) {

    console.log(
      `📊 Analyzing ${file}`
    );

    try {

      const content =
        fs.readFileSync(
          path.join(
            inputFolder,
            file
          ),
          "utf-8"
        );

      const analysis =
        await performanceAnalyticsAgent(
          content
        );

      fs.writeFileSync(
        path.join(
          outputFolder,
          file
        ),
        analysis
      );

      console.log(
        `✅ Analysis complete`
      );

    } catch (error) {

      console.log(
        `❌ Failed ${file}`
      );

      console.log(error.message);
    }
  }

  console.log(
    "\n🎉 Performance analytics complete."
  );
}

run();