const fs = require("fs");

const routerAgent = require("./agents/router-agent");

const researchAgent = require("./agents/research-agent");

const strategyAgent = require("./agents/strategy-agent");

const copyAgent = require("./agents/copy-agent");

const imageAgent = require("./agents/image-agent");

function ensureFolderExists(folderPath) {

  if (!fs.existsSync(folderPath)) {

    fs.mkdirSync(folderPath, { recursive: true });
  }
}

async function run() {

  const topic = "AI tools for startups";

  const memory = {

    topic: topic,
  };

  ensureFolderExists("outputs/autonomous-system");

  // ROUTER AGENT

  console.log("\n🧠 Router Agent deciding workflow...\n");

  const route = await routerAgent(
    memory.topic
  );

  memory.route = route;

  console.log(route);

  // RESEARCH AGENT

  console.log("\n🔍 Research Agent running...\n");

  memory.research = await researchAgent(
    memory.topic
  );

  // STRATEGY AGENT

  console.log("\n📈 Strategy Agent running...\n");

  memory.strategy = await strategyAgent(
    memory
  );

  // COPY AGENT

  console.log("\n✍ Copy Agent running...\n");

  memory.copy = await copyAgent(
    memory.topic,
    `
    Strategy:
    ${memory.strategy}

    Route:
    ${memory.route}
    `
  );

  // IMAGE AGENT

  console.log("\n🎨 Image Agent running...\n");

  memory.image = await imageAgent(
    `
    Topic:
    ${memory.topic}

    Route:
    ${memory.route}

    Strategy:
    ${memory.strategy}
    `
  );

  // SAVE OUTPUTS

  fs.writeFileSync(
    "outputs/autonomous-system/route.json",
    memory.route
  );

  fs.writeFileSync(
    "outputs/autonomous-system/research.txt",
    memory.research
  );

  fs.writeFileSync(
    "outputs/autonomous-system/strategy.txt",
    memory.strategy
  );

  fs.writeFileSync(
    "outputs/autonomous-system/copy.txt",
    memory.copy
  );

  fs.writeFileSync(
    "outputs/autonomous-system/image.txt",
    memory.image
  );

  console.log("\n🎉 Autonomous AI System Complete.");
}

run();