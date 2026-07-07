const validatorFactory = require("./validatorFactory");

exports.validate = async (page, findings) => {

    const validatedFindings = [];

    for (const finding of findings) {

        const validator =
            validatorFactory.getValidator(finding);

        if (!validator) {

            validatedFindings.push(finding);
            continue;

        }

        const result =
            await validator.validate(page, finding);

        validatedFindings.push({

            ...finding,

            validation: result

        });

    }

    return validatedFindings;

};