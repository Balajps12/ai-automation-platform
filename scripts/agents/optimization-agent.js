require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function optimizationAgent(
  originalContent,
  analysis
) {

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: `
        Original Content:

        ${originalContent}

        Analysis:

        ${analysis}

        Improve the content significantly.

        Optimize:
        - hook
        - clarity
        - engagement
        - emotional impact
        - CTA

        Return improved version only.
        `
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = optimizationAgent;