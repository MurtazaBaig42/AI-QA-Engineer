const artifactManager = require("../utils/artifactManager");
const { chromium } = require("playwright");

exports.run = async (url) => {

    let browser;
    let context;

    try {

        // Launch Browser
        browser = await chromium.launch({
            headless: false,
            channel: "chrome"
        });

        // Create Browser Context
        context = await browser.newContext({
            viewport: {
                width: 1440,
                height: 900
            },
            ignoreHTTPSErrors: true
        });

        // Create New Page
        const page = await context.newPage();

        // -------------------------
        // Console Logs
        // -------------------------
        const consoleLogs = [];

        page.on("console", (msg) => {
            consoleLogs.push({
                type: msg.type(),
                text: msg.text()
            });
        });

        // -------------------------
        // Network Logs
        // -------------------------
        const networkLogs = [];

        page.on("request", (request) => {
            networkLogs.push({
                type: "request",
                method: request.method(),
                url: request.url()
            });
        });

        page.on("response", (response) => {
            networkLogs.push({
                type: "response",
                status: response.status(),
                url: response.url()
            });
        });

        // -------------------------
        // Open Website
        // -------------------------
        await page.goto(url, {
            waitUntil: "networkidle",
            timeout: 60000
        });

        // -------------------------
        // Page Title
        // -------------------------
        const title = await page.title();

        // -------------------------
        // Save Screenshot
        // -------------------------
        const screenshotName = await artifactManager.saveScreenshot(page);

        // -------------------------
        // Save HTML
        // -------------------------
        const htmlName = await artifactManager.saveHTML(page);

        // -------------------------
        // Save Network Logs
        // -------------------------
        const networkFile = artifactManager.saveNetwork(networkLogs);

        // -------------------------
        // Close Context & Browser
        // -------------------------
        await context.close();
        await browser.close();

        return {
            status: "passed",
            title,
            screenshot: screenshotName,
            html: htmlName,
            network: networkFile,
            consoleLogs
        };

    } catch (error) {

        if (context) {
            await context.close().catch(() => {});
        }

        if (browser) {
            await browser.close().catch(() => {});
        }

        throw error;
    }

};