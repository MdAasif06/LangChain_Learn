import {
  StructuredOutputParser,
  CommaSeparatedListOutputParser,
} from "@langchain/core/output_parsers";
import { date, z } from "zod";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { ENV } from "../config/env.js";

//  zod schema
const shcema = z.object({
  title: z.string(),
  content: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    error: "Invalid date formate",
  }),
});
//parser
const parser = StructuredOutputParser.fromZodSchema(shcema);

//formate instruction
const formatInstruction = parser.getFormatInstructions();

//prompt template
const prompt = PromptTemplate.fromTemplate(
  `Write a short blog about {topic}.
   Return the response in JSON format.
   {format_instructions}`,
);

//model(Groq)
const model=new ChatGroq({
    apiKey:ENV.GROQ_API_KEY,
    model:"openai/gpt-oss-20b"
})


//main function

async function main(){
    try {
        //generate final prompt
            const finalPrompt=await prompt.format({
                topic:"Node.js",
                format_instructions:formatInstruction
            })

        // call llm
        const response=await model.invoke(finalPrompt)
        console.log("Raw output:\n",response.content)

        //parse output
        const parsed=await parser.parse(response.content as string)

        //conver date ks--> date
        const finalDate={
            ...parsed,
            date:new Date(parsed.date)
        }

        console.log("parsed output:\n",finalDate)
    } catch (error) {
        console.error("Error",error)
    }
}
main()
