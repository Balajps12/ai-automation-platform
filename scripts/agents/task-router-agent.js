async function taskRouterAgent(score) {

  const numericScore =
    parseInt(score);

  if (numericScore >= 90) {

    return "Schedule sales call";
  }

  if (numericScore >= 70) {

    return "Send personalized outreach";
  }

  if (numericScore >= 40) {

    return "Add to email nurture";
  }

  return "Low priority lead";
}

module.exports = taskRouterAgent;