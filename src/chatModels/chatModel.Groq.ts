import { ChatGroq } from "@langchain/groq";
import { ENV } from "../config/env.js";

const model = new ChatGroq({
  apiKey: ENV.GROQ_API_KEY,
  model: "openai/gpt-oss-20b",
  temperature: 0.3,
});

async function main() {
  const res = await model.invoke("what is capital of India?");
  console.log(res.content);
}
main();
