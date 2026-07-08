const validatorFactory =
require("./validatorFactory");

exports.validate = async (
    page,
    findings,
    evidence
) => {

    const validatedFindings = [];

    for (const finding of findings) {

        const validator =
            validatorFactory.getValidator(finding);

        if (!validator) {

            validatedFindings.push({

                ...finding,

                validation: {

                    verified: false,

                    reason:
                        "No validator available."

                }

            });

            continue;

        }

        const result =
            await validator.validate(
                page,
                finding,
                evidence
            );

        validatedFindings.push({

            ...finding,

            validation: result

        });

    }

    return validatedFindings;

};