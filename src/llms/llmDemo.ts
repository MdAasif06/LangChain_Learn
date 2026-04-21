import Groq from "groq-sdk";
import { ENV } from "../config/env.js";

const groq = new Groq({
  apiKey: ENV.GROQ_API_KEY,
});

async function main():Promise<void> {
  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: "what is capital of Bihar?" }],
    model: "openai/gpt-oss-20b",
  });
  console.log((response as any).choices[0].message.content);
}
main();
