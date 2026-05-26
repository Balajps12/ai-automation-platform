require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function followupAgent(lead) {

  const response =
    await client.chat.completions.create({

      model: "openrouter/free",

      messages: [
        {
          role: "user",
          content: `
          Write a professional follow-up email.

          Prospect:
          ${lead.name}

          Company:
          ${lead.company}

          Pain Point:
          ${lead.painPoint}

          Goal:
          Re-engage the lead and
          encourage a reply.

          Tone:
          Friendly and concise.
          `
        }
      ]
    });

  return response
    .choices[0]
    .message
    .content;
}

module.exports = followupAgent;