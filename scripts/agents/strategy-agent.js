require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function strategyAgent(memory) {

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: `
        Based on this research:

        ${memory.research}

        Create a marketing strategy.

        Include:
        - target audience
        - positioning
        - emotional triggers
        - content angle
        - call-to-action strategy
        `
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = strategyAgent;