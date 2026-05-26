const express = require("express");

const cors = require("cors");

const path = require("path");

const app = express();

app.use(cors());

const PORT =
  process.env.PORT || 5000;

// HOMEPAGE

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "command-center.html"
    )
  );
});

// API

app.get(
  "/api/command-center",
  (req, res) => {

    const data = {

      campaigns: [

        {
          file:
            "linkedin-growth.txt",

          content:
            "AI optimized LinkedIn growth campaign with stronger hooks, improved CTA, and higher engagement strategy."
        },

        {
          file:
            "lead-generation.txt",

          content:
            "Optimized lead generation funnel using AI outreach and personalized automation workflows."
        },

        {
          file:
            "ai-productivity.txt",

          content:
            "AI-powered productivity campaign designed to increase conversion and audience retention."
        }
      ],

      analytics: [

        {
          file:
            "campaign-analysis.txt",

          content:
            "Performance Score: 92/100\n\nStrong emotional hooks and excellent CTA performance."
        },

        {
          file:
            "growth-report.txt",

          content:
            "AI system detected improved conversion likelihood and stronger audience engagement."
        },

        {
          file:
            "optimization-report.txt",

          content:
            "AI optimization engine improved messaging clarity and CTA effectiveness."
        }
      ],

      crm: {

        totalLeads: 24,

        highPriority: 8,

        followUpsGenerated: 19,
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

// SERVER

app.listen(PORT, () => {

  console.log(
    `🚀 Command Center running on port ${PORT}`
  );
});