import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { ENV } from "../config/env.js";
const model = new ChatGroq({
    apiKey: ENV.GROQ_API_KEY,
    model: "openai/gpt-oss-20b",
    temperature: 0.1,
    // maxTokens: 1000,
});
// const topic:string = "JWT Authentication";
const template = new PromptTemplate({
    template: "Explain {topic} in simple english 3 line",
    inputVariables: ["topic"],
});
const prompt = await template.format({
    topic: "mongoDB"
});
async function main() {
    try {
        const res = await model.invoke(prompt);
        // console.log("FULL RESPONSE:", res);
        console.log("CONTENT:", res.content);
    }
    catch (err) {
        console.error("ERROR:", err);
    }
}
main();
//# sourceMappingURL=chatModel.Groq.js.map