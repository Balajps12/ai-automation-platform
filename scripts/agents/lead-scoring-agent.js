require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function leadScoringAgent(lead) {

  const response =
    await client.chat.completions.create({

      model: "openrouter/free",

      messages: [
        {
          role: "user",
          content: `
          Analyze this lead.

          Name:
          ${lead.name}

          Company:
          ${lead.company}

          Role:
          ${lead.role}

          Pain Point:
          ${lead.painPoint}

          Score this lead from 1-100
          based on:
          - likelihood to buy
          - business value
          - urgency
          - decision-making power

          Return ONLY a number.
          `
        }
      ]
    });

  return response
    .choices[0]
    .message
    .content;
}

module.exports = leadScoringAgent;