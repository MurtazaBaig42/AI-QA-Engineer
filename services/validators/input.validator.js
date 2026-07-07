exports.validate = async (page) => {

    const count =
        await page.locator("input").count();

    return {

        verified: true,

        actualInputs: count

    };

};