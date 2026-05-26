const fs = require("fs");

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

  const topic = "AI marketing automation";

  const memory = {

    topic: topic,

    research: "",

    strategy: "",

    linkedinPost: "",

    imagePrompt: "",
  };

  ensureFolderExists("outputs/multi-agent");

  // RESEARCH AGENT

  console.log("\n🔍 Running Research Agent...\n");

  memory.research = await researchAgent(
    memory.topic
  );

  // STRATEGY AGENT

  console.log("\n🧠 Running Strategy Agent...\n");

  memory.strategy = await strategyAgent(
    memory
  );

  // COPY AGENT

  console.log("\n✍ Running Copy Agent...\n");

  memory.linkedinPost = await copyAgent(
    memory.topic,
    `
    Research:
    ${memory.research}

    Strategy:
    ${memory.strategy}
    `
  );

  // IMAGE AGENT

  console.log("\n🎨 Running Image Agent...\n");

  memory.imagePrompt = await imageAgent(
    `
    Topic:
    ${memory.topic}

    Strategy:
    ${memory.strategy}
    `
  );

  // SAVE EVERYTHING

  fs.writeFileSync(
    "outputs/multi-agent/research.txt",
    memory.research
  );

  fs.writeFileSync(
    "outputs/multi-agent/strategy.txt",
    memory.strategy
  );

  fs.writeFileSync(
    "outputs/multi-agent/post.txt",
    memory.linkedinPost
  );

  fs.writeFileSync(
    "outputs/multi-agent/image-prompt.txt",
    memory.imagePrompt
  );

  console.log("\n🎉 Advanced Multi-Agent Workflow Complete.");
}

run();