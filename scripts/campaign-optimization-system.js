const fs = require("fs");

const path = require("path");

const campaignOptimizerAgent =
  require(
    "./agents/campaign-optimizer-agent"
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
    "outputs/linkedin";

  const outputFolder =
    "outputs/optimized-campaigns";

  ensureFolderExists(outputFolder);

  const files =
    fs.readdirSync(inputFolder);

  for (const file of files) {

    console.log(
      `🤖 Optimizing ${file}`
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

      const optimized =
        await campaignOptimizerAgent(
          content
        );

      fs.writeFileSync(
        path.join(
          outputFolder,
          file
        ),
        optimized
      );

      console.log(
        `✅ Optimized ${file}`
      );

    } catch (error) {

      console.log(
        `❌ Failed ${file}`
      );

      console.log(error.message);
    }
  }

  console.log(
    "\n🎉 Campaign optimization complete."
  );
}

run();