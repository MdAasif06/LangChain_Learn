import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ENV } from "../config/env.js";

const model = new ChatGroq({
  apiKey: ENV.GROQ_API_KEY,
  model: "openai/gpt-oss-20b",
  temperature: 0.7,
});

const main = async () =>{
  try {
    //create prompt template
    /**const prompt = ChatPromptTemplate.fromTemplate(
      `You are a comedian,Tell a joke based on the folling word {input}`,
    );
    */
   const prompt = ChatPromptTemplate.fromMessages([
    ["system","Generate a joke based on a word provided by the user"],
    ["human","{input}"]
   ]);
    // console.log(await prompt.format({input:"chicken"}))
    
    //create a chain
    const chain = prompt.pipe(model);
    //console.log(chain) ///this is show all informatioon as api key and output parser,model,temp,template etc

    //call chain
    const response = await chain.invoke({
      input: "cat",
    });
    console.log(response.content);
  } catch (error) {
    console.error("Error",error)
  }
};
main()