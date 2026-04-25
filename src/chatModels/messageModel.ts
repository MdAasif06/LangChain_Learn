import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage,AIMessage } from "langchain";
import { ENV } from "../config/env.js";

const model = new ChatGroq({
  apiKey: ENV.GROQ_API_KEY,
  model: "openai/gpt-oss-20b",
//   temperature: 0.3,
});

// const systemMsg = new SystemMessage("Your are helpful assistent.");
// const humanMsg = new HumanMessage("Tell me 5 line of langchain?");

// const messages = [
//     new SystemMessage("You are a poetry expert."),
//     new HumanMessage("Write a haiku about spring"),
//     new AIMessage("Cherry blossoms bloom..."),

// ];

/** 
 * dictionary formate 
 */
const messages=[
    // {role:"system",content:"You are a poetry expert"},
    {role:"user",content:"Explain MERN stack in simple words"},
  // {role:"assistant",content:"Cherry blossoms bloom..."},
]

// const response = await model.invoke(messages);
// console.log(response.content);

//using stream
async function main() {
  const stream = await model.stream(messages);

  for await (const chunk of stream) {
    const { content } = chunk;
    if (typeof content === "string") {
      process.stdout.write(content);
    } else if (Array.isArray(content)) {
      const text = content.map((part) => {
          if (typeof part === "string") {
            return part;
          }

          if (part && typeof part === "object" && "text" in part && typeof part.text === "string")
          {
            return part.text;
          }
          return "";
        }).join("");

      if (text) {
        process.stdout.write(text);
      }
    }
  }
}

main();
