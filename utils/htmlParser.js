const fs = require("fs");

exports.parseHTML = (htmlFilePath) => {

    const html = fs.readFileSync(htmlFilePath, "utf8");

    const title =
        html.match(/<title>(.*?)<\/title>/i)?.[1] || "No Title";

    const buttons =
        (html.match(/<button/gi) || []).length;

    const forms =
        (html.match(/<form/gi) || []).length;

    const inputs =
        (html.match(/<input/gi) || []).length;

    const links =
        (html.match(/<a /gi) || []).length;

    const images =
        (html.match(/<img/gi) || []).length;

    return {

        title,

        buttons,

        forms,

        inputs,

        links,

        images

    };

};