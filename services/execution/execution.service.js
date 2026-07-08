const browserManager = require("../browserManager.service");
const playwrightService = require("../playwright.service");
const evidenceService = require("../evidence.service");
const aiService = require("../ai/ai.service");

const findingValidator =
require("../validation/findingValidator");

exports.execute = async (request) => {

    let session;

    try {

        // Browser Session
        session =
            await browserManager.createSession(request);

        // Playwright Execution
        const execution =
            await playwrightService.run(session, request);

        // Evidence
        const evidence =
            evidenceService.buildEvidence(execution);

        // AI Analysis
        const aiAnalysis =
            await aiService.analyze(evidence);

        // Validation
        if (
            aiAnalysis.findings &&
            aiAnalysis.findings.length > 0
        ) {

            aiAnalysis.findings =
                await findingValidator.validate(

                    execution.page,

                    aiAnalysis.findings,

                    evidence

                );

        }

        // Remove page object before response
        delete execution.page;

        return {

            execution,

            evidence,

            aiAnalysis

        };

    }

    finally {

        if (session) {

            await browserManager.closeSession(session);

        }

    }

};