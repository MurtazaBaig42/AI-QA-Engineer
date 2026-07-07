exports.validate = async (page) => {

    const count =
        await page.locator("button").count();

    return {

        verified: true,

        actualButtons: count

    };

};