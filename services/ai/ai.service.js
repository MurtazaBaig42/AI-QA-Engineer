const promptBuilder =
require("./promptBuilder");

const providerFactory =
require("./providers/providerFactory");

const responseParser =
require("./parsers/responseParser");

exports.analyze = async (evidence) => {

    const prompt =
        promptBuilder.buildPrompt(evidence);

   const provider =
providerFactory.getProvider();

const result =
await provider.analyze(prompt);

const parsed =
responseParser.parse(
    result.rawResponse
);

return parsed;

};