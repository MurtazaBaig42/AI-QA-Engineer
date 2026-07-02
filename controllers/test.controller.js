const playwrightService = require("../services/playwright.service");
const executionRequest = require("../models/executionRequest");

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

        res.json(result);

    } catch (error) {

        res.status(500).json({
            status: "failed",
            error: error.message
        });

    }

};