const config =
require("../../../config/ai.config");

const geminiProvider =
require("./gemini.provider");

const openAIProvider =
require("./openai.provider");

const ollamaProvider =
require("./ollama.provider");

exports.getProvider = () => {

    switch (config.provider) {

        case "gemini":

            return geminiProvider;

        case "openai":

            return openAIProvider;

        case "ollama":

            return ollamaProvider;

        default:

            throw new Error(
                "Unknown AI Provider"
            );

    }

};