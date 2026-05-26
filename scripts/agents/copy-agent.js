require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function copyAgent(topic, research) {

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: `
        Using this research:

        ${research}

        Write a high-quality LinkedIn post about ${topic}.

        Include:
        - strong hook
        - insights
        - CTA

        Tone:
        Professional and engaging.
        `
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = copyAgent;