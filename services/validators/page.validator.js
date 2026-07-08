exports.validate = async (page, finding) => {

    const title = await page.title();

    const body = await page.locator("body").count();

    return {

        verified: body > 0,

        title,

        bodyFound: body > 0

    };

};