import Groq from "groq-sdk";
import { ENV } from "../config/env.js";
const groq = new Groq({
    apiKey: ENV.GROQ_API_KEY,
});
async function main() {
    const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: "what is capital of India?" }],
        model: "openai/gpt-oss-20b",
    });
    console.log(response.choices[0].message.content);
}
main();
//# sourceMappingURL=llmDemo.js.map