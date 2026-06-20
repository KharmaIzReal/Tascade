const asyncHandler = require("express-async-handler");

const suggestPriority = asyncHandler(async (req, res) => {
  const { task } = req.body;

  if (!task) {
    res.status(400);
    throw new Error("Task is required");
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
           content: `You are an intelligent task prioritization assistant.

Classify every task into ONLY one of these priorities:

- urgent: Deadlines today, tomorrow, overdue, emergencies, exams, interviews, critical work.
- high: Important tasks with deadlines within a few days, assignments, projects, meetings, study goals.
- low: Routine tasks with no clear deadline, optional activities, hobbies, entertainment, shopping lists.

If the task mentions "today", "tomorrow", "day after tomorrow", a specific date, "ASAP", "deadline", or sounds time-sensitive, never return "low".

Reply with ONLY one word:
low
high
urgent`
          },
          {
            role: "user",
            content: task
          }
        ]
      })
    });

    const data = await response.json();

    const priority =
      data.choices[0].message.content.trim().toLowerCase();

    res.json({ priority });
  } catch (err) {
    res.status(500);
    throw new Error("AI request failed");
  }
});

const breakdownTask = asyncHandler(async (req, res) => {
  const { task } = req.body;

  if (!task) {
    res.status(400);
    throw new Error("Task is required");
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Break the user's task into 4-6 short actionable subtasks. Reply only with the list."
          },
          {
            role: "user",
            content: task
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      breakdown: data.choices[0].message.content
    });

  } catch {
    res.status(500);
    throw new Error("AI request failed");
  }
});

module.exports = {
  suggestPriority,
  breakdownTask,
};