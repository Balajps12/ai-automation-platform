require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function researchAgent(topic) {

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: `
        Research the topic: ${topic}

        Provide:
        - key trends
        - statistics
        - audience pain points
        - opportunities

        Format clearly.
        `
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = researchAgent;