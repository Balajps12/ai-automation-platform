require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function performanceAnalyticsAgent(
  content
) {

  const response =
    await client.chat.completions.create({

      model: "openrouter/free",

      messages: [
        {
          role: "user",
          content: `
          Analyze this marketing campaign.

          ${content}

          Evaluate:
          - hook quality
          - emotional impact
          - engagement potential
          - CTA effectiveness
          - conversion likelihood

          Return:
          1. Overall score out of 100
          2. Strengths
          3. Weaknesses
          4. Strategic recommendations
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
  performanceAnalyticsAgent;