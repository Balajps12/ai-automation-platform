require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function campaignOptimizerAgent(
  content
) {

  const response =
    await client.chat.completions.create({

      model: "openrouter/free",

      messages: [
        {
          role: "user",
          content: `
          Analyze this marketing content:

          ${content}

          Improve:
          - hook
          - engagement
          - emotional triggers
          - CTA
          - clarity

          Return:
          1. Weaknesses
          2. Improved Version
          `
        }
      ]
    });

  return response
    .choices[0]
    .message
    .content;
}

module.exports =
  campaignOptimizerAgent;