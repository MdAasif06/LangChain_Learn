import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ENV } from "../config/env.js";
import { StringOutputParser, CommaSeparatedListOutputParser, StructuredOutputParser, } from "@langchain/core/output_parsers";
import { z } from "zod";
const model = new ChatGroq({
    apiKey: ENV.GROQ_API_KEY,
    model: "openai/gpt-oss-20b",
    temperature: 0.7,
});
const main = async () => {
    try {
        //create prompt template
        /**const prompt = ChatPromptTemplate.fromTemplate(
          `You are a comedian,Tell a joke based on the folling word {input}`,
        );
        */
        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "Generate a joke based on a word provided by the user"],
            ["human", "{input}"],
        ]);
        // console.log(await prompt.format({input:"chicken"}))
        // create parser
        const parser = new StringOutputParser();
        //create a chain
        const chain = prompt.pipe(model).pipe(parser);
        //console.log(chain) ///this is show all informatioon as api key and output parser,model,temp,template etc
        //call chain
        return await chain.invoke({
            input: "cat",
        });
    }
    catch (error) {
        console.error("Error", error);
    }
};
async function callListOutputParser() {
    const prompt = ChatPromptTemplate.fromTemplate(`
        Provides 5 synonyms,seperated by commas ,for folloing {word}
    `);
    const outpurParser = new CommaSeparatedListOutputParser();
    const chain = prompt.pipe(model).pipe(outpurParser);
    return await chain.invoke({
        word: "happy",
    });
}
//structure outpur parser
async function callStructureParser() {
    const prompt = ChatPromptTemplate.fromTemplate(`
        Extract information from the following phrase.
        formatting Instruction:{format_instruction}
        Phrase:{phrase}`);
    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name: "the name of the person",
        age: "the age of the person",
    });
    const chain = prompt.pipe(model).pipe(outputParser);
    return await chain.invoke({
        phrase: "Max is 30 years old",
        format_instruction: outputParser.getFormatInstructions(),
    });
}
//using Zod
async function callZodOutputParser() {
    const prompt = ChatPromptTemplate.fromTemplate(`
    Extract information from the following phrase.
    formatting Instruction:{format_instruction}
    Phrase:{phrase}
    `);
    const outputParser = StructuredOutputParser.fromZodSchema(z.object({
        recipe: z.string().describe("name of recepe"),
        ingradients: z.array(z.string()).describe("ingredients")
    }));
    const chain = prompt.pipe(model).pipe(outputParser);
    return await chain.invoke({
        phrase: "The ingradients for a pizza recipe with a,minced beef,garlic,herbs,cordinate leaf,",
        format_instruction: outputParser.getFormatInstructions()
    });
}
// const res=await callListOutputParser()
// const res = await main();
const res = await callZodOutputParser();
// const res = await callStructureParser();
console.log(res);
//# sourceMappingURL=outputParserTwo.js.map