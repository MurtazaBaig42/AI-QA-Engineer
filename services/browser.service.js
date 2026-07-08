const { chromium, firefox, webkit } = require("playwright");

exports.launchBrowser = async (browserName = "chrome", headless = false) => {

    switch (browserName.toLowerCase()) {

        case "firefox":
            return await firefox.launch({
                headless
            });

        case "webkit":
            return await webkit.launch({
                headless
            });

        case "chrome":
        default:
            return await chromium.launch({
                headless,
                channel: "chrome"
            });

    }

};