import { tool } from "langchain";
import * as z from "zod";
import { ChatGroq } from "@langchain/groq";
import { ENV } from "../config/env.js";

//tool created
const getWeather = tool((input) => `It is sunny in ${input.location}`, {
  name: "get_weather",
  description: "Get the weather at a location",
  schema: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
});

//model
const model = new ChatGroq({
  apiKey: ENV.GROQ_API_KEY,
  model: "openai/gpt-oss-20b",
});

const modelWithTool = model.bindTools([getWeather]);

async function main(): Promise<void> {
  try {
    const userQuery = "What's the weather like in Bihar?";
    const response = await modelWithTool.invoke(userQuery);

    console.log("MODEL RESPONSE:", response);

    //check if tool call exists or not
    if (response.tool_calls && response.tool_calls.length > 0) {
      const toolCall = response.tool_calls[0];
      // console.log(toolCall?.name)
      // console.log(toolCall?.args)

      if (toolCall && toolCall.name === "get_weather") {
        const result = await getWeather.invoke(
          toolCall.args as { location: string },
        );
        console.log("TOOL RESULT:", result);

        // ✅ Send tool result back to model
        const finalResponse = await modelWithTool.invoke([
          response,
          {
            role: "tool",
            content: result,
            tool_call_id: toolCall.id,
          },
        ]);
        console.log("FINAL ANSWER:", finalResponse.content);
      }
    } else {
      console.log("No tool call, direct answer:", response.content);
    }
  } catch (error) {
    console.error("Error", error);
  }
}
main();
