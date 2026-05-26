const fs = require("fs");

const copyAgent = require("./agents/copy-agent");

const analyticsAgent = require("./agents/analytics-agent");

const optimizationAgent = require("./agents/optimization-agent");

function ensureFolderExists(folderPath) {

  if (!fs.existsSync(folderPath)) {

    fs.mkdirSync(folderPath, { recursive: true });
  }
}

async function run() {

  const topic = "AI marketing automation";

  ensureFolderExists(
    "outputs/self-improving-system"
  );

  console.log("\n✍ Generating initial content...\n");

  const originalContent = await copyAgent(
    topic,
    "Create engaging LinkedIn content."
  );

  console.log(originalContent);

  console.log("\n📊 Running Analytics Agent...\n");

  const analysis = await analyticsAgent(
    originalContent
  );

  console.log(analysis);

  console.log("\n🚀 Running Optimization Agent...\n");

  const optimizedContent = await optimizationAgent(
    originalContent,
    analysis
  );

  console.log(optimizedContent);

  fs.writeFileSync(
    "outputs/self-improving-system/original.txt",
    originalContent
  );

  fs.writeFileSync(
    "outputs/self-improving-system/analysis.txt",
    analysis
  );

  fs.writeFileSync(
    "outputs/self-improving-system/optimized.txt",
    optimizedContent
  );

  console.log(
    "\n🎉 Self-Improving AI System Complete."
  );
}

run();