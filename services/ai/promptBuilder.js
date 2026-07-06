const fs = require("fs");
const path = require("path");

exports.buildPrompt = (evidence) => {

    const template = fs.readFileSync(

        path.join(
            __dirname,
            "../../prompts/qa-analysis.txt"
        ),

        "utf8"

    );

    return `
${template}

Execution Evidence

${JSON.stringify(evidence, null, 2)}
`;

};