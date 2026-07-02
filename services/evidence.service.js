const path = require("path");

const consoleParser =
require("../utils/consoleParser");

const networkParser =
require("../utils/networkParser");

const htmlParser =
require("../utils/htmlParser");

exports.buildEvidence = (executionResult) => {

    const htmlPath = path.join(

        __dirname,

        "../artifacts/html",

        executionResult.html

    );

    const htmlSummary =
        htmlParser.parseHTML(htmlPath);

        const networkPath = path.join(

    __dirname,

    "../artifacts/network",

    executionResult.network

);

const networkSummary =
networkParser.parseNetwork(networkPath);

const consoleSummary =
consoleParser.parseConsole(
    executionResult.consoleLogs
);

    return {

        executionId:
            executionResult.executionId,

        title:
            executionResult.title,

        htmlSummary,

        screenshot:
            executionResult.screenshot,

        networkSummary,

        consoleSummary,

    };

};