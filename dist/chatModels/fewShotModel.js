import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, FewShotChatMessagePromptTemplate, } from "@langchain/core/prompts";
import { ENV } from "../config/env.js";
const chat = new ChatGroq({
    apiKey: ENV.GROQ_API_KEY,
    model: "openai/gpt-oss-20b",
});
//few shot example
const examples = [
    { input: "2+2", output: "4" },
    { input: "2+4", output: "6" },
    { input: "2+6", output: "8" },
];
const examplePrompt = ChatPromptTemplate.fromMessages([
    ["human", "{input}"],
    ["ai", "{output}"],
]);
const fewShotPrompt = new FewShotChatMessagePromptTemplate({
    examplePrompt,
    examples,
    inputVariables: ["input"],
});
const finalPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are helpful math problem solver."],
    fewShotPrompt,
    ["human", "{input}"],
]);
const formattedPrompt = await finalPrompt.format({
    input: "2+10"
});
// console.log("formatted output", formattedPrompt);
const response = await chat.invoke(formattedPrompt);
console.log(response.content);
//# sourceMappingURL=fewShotModel.js.map