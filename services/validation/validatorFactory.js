const buttonValidator =
require("../validators/button.validator");

const inputValidator =
require("../validators/input.validator");

exports.getValidator = (finding) => {

    const title =
        finding.title.toLowerCase();

    if (title.includes("button")) {

        return buttonValidator;

    }

    if (title.includes("input")) {

        return inputValidator;

    }

    return null;

};