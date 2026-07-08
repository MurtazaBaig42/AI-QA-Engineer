const artifactManager = require("../utils/artifactManager");

exports.run = async (session, request) => {

    console.log("========== EXECUTION REQUEST ==========");
    console.log(request);
    console.log("=======================================");

    const { page } = session;

    // Console Logs
    const consoleLogs = [];

    // Network Logs
    const networkLogs = [];

    page.on("console", (msg) => {

        consoleLogs.push({

            type: msg.type(),
            text: msg.text()

        });

    });

    page.on("request", (req) => {

        networkLogs.push({

            type: "request",
            method: req.method(),
            url: req.url()

        });

    });

    page.on("response", (res) => {

        networkLogs.push({

            type: "response",
            status: res.status(),
            url: res.url()

        });

    });

    // Validate URL
    if (!request.url) {

        throw new Error("URL is missing from execution request.");

    }

    // Open Website
    await page.goto(request.url, {

        waitUntil: "networkidle",
        timeout: 60000

    });

    // Get Page Title
    const title = await page.title();

    // Save Artifacts
    const screenshotName = await artifactManager.saveScreenshot(page);

    const htmlName = await artifactManager.saveHTML(page);

    const networkFile = artifactManager.saveNetwork(networkLogs);

    // Return Execution Result
    return {

        status: "passed",

        executionId: request.executionId,

        title,

        screenshot: screenshotName,

        html: htmlName,

        network: networkFile,

        consoleLogs

    };

};