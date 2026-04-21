import { ChatGroq } from "@langchain/groq";
import { ENV } from "../config/env.js";
const model = new ChatGroq({
    apiKey: ENV.GROQ_API_KEY,
    model: "openai/gpt-oss-20b",
    temperature: 0.3,
    maxTokens: 1000
});
async function main() {
    try {
        const res = await model.invoke("who is father of cricket in India");
        console.log("FULL RESPONSE:", res);
        console.log("CONTENT:", res.content);
    }
    catch (err) {
        console.error("ERROR:", err);
    }
}
main();
//# sourceMappingURL=chatModel.Groq.js.map