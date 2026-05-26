require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function imageAgent(topic) {

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: `
        Create a cinematic AI image prompt about ${topic}.

        Include:
        - startup aesthetic
        - lighting
        - realism
        - environment
        - camera angle
        `
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = imageAgent;