require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function routerAgent(topic) {

  const response = await client.chat.completions.create({

    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: `
        Analyze this topic:

        ${topic}

        Decide the BEST marketing content strategy.

        Return ONLY JSON.

        Example:

        {
          "platform": "LinkedIn",
          "style": "Professional",
          "content_types": [
            "LinkedIn Post",
            "Cold Email",
            "Case Study"
          ]
        }
        `
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = routerAgent;