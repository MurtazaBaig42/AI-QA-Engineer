const { GoogleGenAI } = require("@google/genai");
const config = require("../../../config/ai.config");

const ai = new GoogleGenAI({
    apiKey: config.geminiApiKey
});

exports.analyze = async (prompt) => {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return {
        rawResponse: response.text
    };

};