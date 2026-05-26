const cron = require("node-cron");

console.log(
  "🚀 Autonomous AI Workflow Started"
);

// LEAD SCORING

cron.schedule("*/1 * * * *", () => {

  console.log(
    "\n🤖 Running Lead Scoring Workflow..."
  );

  require("./lead-scoring-system");
});

// FOLLOW-UP SYSTEM

cron.schedule("*/2 * * * *", () => {

  console.log(
    "\n📧 Running Follow-Up Workflow..."
  );

  require("./followup-system");
});

// TASK ROUTING

cron.schedule("*/3 * * * *", () => {

  console.log(
    "\n🧠 Running Task Routing Workflow..."
  );

  require("./task-routing-system");
});

// CAMPAIGN OPTIMIZATION

cron.schedule("*/4 * * * *", () => {

  console.log(
    "\n🚀 Running Campaign Optimization..."
  );

  require(
    "./campaign-optimization-system"
  );
});

// PERFORMANCE ANALYTICS

cron.schedule("*/5 * * * *", () => {

  console.log(
    "\n📊 Running Performance Analytics..."
  );

  require(
    "./performance-analytics-system"
  );
});

console.log(
  "\n✅ Autonomous workflows active."
);