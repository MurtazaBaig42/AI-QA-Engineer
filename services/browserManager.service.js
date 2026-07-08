const browserService = require("./browser.service");

exports.createSession = async (request) => {

    const browser =
        await browserService.launchBrowser(
            request.browser,
            request.headless
        );

    const context =
        await browser.newContext({

            viewport: {

                width: 1440,
                height: 900

            },

            ignoreHTTPSErrors: true

        });

    const page =
        await context.newPage();

    return {

        browser,

        context,

        page

    };

};

exports.closeSession = async (session) => {

    try {

        if (session.context) {

            await session.context.close();

        }

    }

    finally {

        if (session.browser) {

            await session.browser.close();

        }

    }

};