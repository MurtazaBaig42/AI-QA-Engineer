const playwrightService = require("../services/playwright.service");
const executionRequest = require("../models/executionRequest");
const aiService = require("../services/ai/ai.service");
const evidenceService = require("../services/evidence.service");

exports.runTest = async (req, res) => {

    console.log("========== REQUEST BODY ==========");
    console.log(req.body);
    console.log("==================================");

    const validation =
        executionRequest.validateExecutionRequest(req.body);

    if (!validation.valid) {

        return res.status(400).json({
            status: "failed",
            errors: validation.errors
        });

    }

    try {

        const result = await playwrightService.run(req.body);
        // Build Evidence
           const evidence =
        await evidenceService.buildEvidence(result);

        // AI Analysis
            const aiAnalysis =
        await aiService.analyze(evidence);

        res.json({

    execution: result,

    evidence,

    aiAnalysis

    });

    } catch (error) {

        res.status(500).json({
            status: "failed",
            error: error.message
        });

    }

};