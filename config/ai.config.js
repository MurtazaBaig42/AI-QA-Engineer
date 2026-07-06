require("dotenv").config();

module.exports = {

    provider: process.env.AI_PROVIDER,

    geminiApiKey: process.env.GEMINI_API_KEY,

    openaiApiKey: process.env.OPENAI_API_KEY

};