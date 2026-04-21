import dotenv from "dotenv";
dotenv.config();
if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing API Key");
}
export const ENV = {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
};
//# sourceMappingURL=env.js.map