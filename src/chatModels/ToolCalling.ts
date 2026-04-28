import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import {tool} from "@langchain/core/tools"
import { ENV } from "../config/env.js";

const model = new ChatGroq({
  apiKey: ENV.GROQ_API_KEY,
  model: "openai/gpt-oss-20b",
  temperature: 0.1,
  // maxTokens: 1000,
  
});

// const topic:string 
const template = new PromptTemplate({
  template: "Current time of {city}",
  inputVariables: ["city"],
});

const prompt=await template.format({
  city:"New York"
})

//create a tool for telling time of new York
const getTimeOfNewYork = tool(
  async () => {
    return new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
  },
  {
    name: "get_time_of_new_york",
    description: "Returns the current time in New York",
  }
);

const modelWithTools = model.bindTools([getTimeOfNewYork]);

async function main(): Promise<void> {
  try {
    const res = await modelWithTools.invoke(prompt);

    //  Check if tool call exists
    if (res.tool_calls && res.tool_calls.length > 0) {
      const toolCall = res.tool_calls[0];

      if (toolCall && toolCall.name === "get_time_of_new_york") {
        const result = await getTimeOfNewYork.invoke({});
        console.log("TOOL RESULT:", result);
      }
    } else {
      console.log("CONTENT:", res.content);
    }

  } catch (err) {
    console.error("ERROR:", err);
  }
}

main()



// async function main(): Promise<void> {
//   try {
//     const res = await modelWithTools.invoke(prompt);
//     // console.log("FULL RESPONSE:", res);
//     console.log(JSON.stringify(res, null, 2));
//     // console.log("CONTENT:", res.content);
//   } catch (err) {
//     console.error("ERROR:", err);
//   }
// }
// main();
