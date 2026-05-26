require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function analyticsAgent(content) {

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: `
        Analyze this marketing content:

        ${content}

        Evaluate:
        - hook strength
        - clarity
        - emotional impact
        - engagement potential
        - CTA effectiveness

        Give:
        - score out of 10
        - weaknesses
        - improvement suggestions
        `
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = analyticsAgent;