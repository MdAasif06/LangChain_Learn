import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ENV } from "../config/env.js";
import { Document } from "@langchain/core/documents";

const model = new ChatGroq({
  apiKey: ENV.GROQ_API_KEY,
  model: "openai/gpt-oss-20b",
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromTemplate(`
    Answer the user's question based only on the context.
    Context: {context}
    Question: {input}
`);

const documentA = new Document({
  pageContent:
    `The LangChain Expression Language (LCEL) is a powerful interface designed to 
    simplify the creation and management of custom chains in LangChain`,
});

//  manual combine (replace removed util)
const context = [documentA].map(doc => doc.pageContent).join("\n\n");

const chain = prompt.pipe(model);

const response = await chain.invoke({
  input: "What is LCEL?",
  context: context,
});

console.log(response.content);