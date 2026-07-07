const executionService =
require("../services/execution/execution.service");

const executionRequest =
require("../models/executionRequest");

exports.runTest = async (req, res) => {

    const validation =
        executionRequest.validateExecutionRequest(req.body);

    if (!validation.valid) {

        return res.status(400).json({
            status: "failed",
            errors: validation.errors
        });

    }

    try {

        const result =
            await executionService.execute(req.body);

        res.json(result);

    }

    catch (error) {

        res.status(500).json({

            status: "failed",

            error: error.message

        });

    }

};