const { chromium } = require("playwright");

exports.launchBrowser = async () => {

    const browser = await chromium.launch({

        headless: false,

        channel: "chrome"

    });

    return browser;

};