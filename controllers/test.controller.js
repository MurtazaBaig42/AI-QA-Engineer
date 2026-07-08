const executionService = require("../services/execution/execution.service");
const executionRequest = require("../models/executionRequest");
const reportService =  require("../services/report/report.service");

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

        const result =
await executionService.execute(req.body);

const reports =
await reportService.generate(result);

res.json({

    ...result,

    reports

});

    }

    catch (error) {

        res.status(500).json({

            status: "failed",

            error: error.message

        });

    }

};