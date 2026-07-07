const playwrightService = require("../playwright.service");
const evidenceService = require("../evidence/evidence.service");
const aiService = require("../ai/ai.service");

exports.execute = async (request) => {

    // Step 1
    const execution =
        await playwrightService.run(request);

    // Step 2
    const evidence =
    evidenceService.buildEvidence(execution);

    // Step 3
    const aiAnalysis =
        await aiService.analyze(evidence);

    return {

        execution,

        evidence,

        aiAnalysis

    };

};