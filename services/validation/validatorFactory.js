const buttonValidator =
require("../validators/button.validator");

const inputValidator =
require("../validators/input.validator");

const networkValidator =
require("../validators/network.validator");

const consoleValidator =
require("../validators/console.validator");

const pageValidator =
require("../validators/page.validator");

exports.getValidator = (finding) => {

    const title = finding.title.toLowerCase();

    if (title.includes("button")) {

        return buttonValidator;

    }

    if (title.includes("input")) {

        return inputValidator;

    }

    if (
        title.includes("network") ||
        title.includes("request")
    ) {

        return networkValidator;

    }

    if (
        title.includes("console") ||
        title.includes("javascript")
    ) {

        return consoleValidator;

    }

    if (
        title.includes("page") ||
        title.includes("blank")
    ) {

        return pageValidator;

    }

    return null;

};