import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage, AIMessage } from "langchain";
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
const messages = [
    { role: "system", content: "You are a poetry expert" },
    { role: "user", content: "Write a haiku about spring" },
    { role: "assistent", content: "Cherry blossoms bloom..." },
];
const response = await model.invoke(messages);
console.log(response.content);
//# sourceMappingURL=messageModel.js.map