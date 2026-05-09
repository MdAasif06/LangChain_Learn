
import { createAgent, tool } from "langchain";
import { ChatGroq } from "@langchain/groq";
import * as z from "zod";
import { ENV } from "../config/env.js";

const getWeather = tool(
  async ({ city }) => {
    return `It's always sunny in ${city}!`;
  },
  {
    name: "get_weather",
    description: "Get weather for a city",
    schema: z.object({
      city: z.string().describe("City name"),
    }),
  }
);

const model = new ChatGroq({
  apiKey: ENV.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
});

const agent = createAgent({
  model,
  tools: [getWeather],
});

const response = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: "What's the weather in San Francisco?",
      },
    ],
  },
);

console.log(response.messages.at(-1)?.content);