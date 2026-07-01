const playwrightService = require("../services/playwright.service");

exports.runTest = async (req, res) => {

    try {

        const result = await playwrightService.run(req.body.url);

        res.json(result);

    }

    catch (error) {

        res.status(500).json({

            status: "failed",

            error: error.message

        });

    }

};