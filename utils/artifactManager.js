const fs = require("fs");
const path = require("path");

console.log("Latest Artifact Manager Loaded 🚀");
console.log(__filename);

function ensureDirectory(folderPath) {

    if (!fs.existsSync(folderPath)) {

        fs.mkdirSync(folderPath, {
            recursive: true
        });

    }

}

function generateFileName(prefix, extension) {

    return `${prefix}-${Date.now()}.${extension}`;

}

async function saveScreenshot(page) {

    const folder = path.join(__dirname, "../artifacts/screenshots");

    ensureDirectory(folder);

    const fileName = generateFileName("screenshot", "png");

    const filePath = path.join(folder, fileName);

    await page.screenshot({

        path: filePath,

        fullPage: true

    });

    return fileName;

}

async function saveHTML(page) {

    const folder = path.join(__dirname, "../artifacts/html");

    ensureDirectory(folder);

    const fileName = generateFileName("page", "html");

    const filePath = path.join(folder, fileName);

    const html = await page.content();

    fs.writeFileSync(filePath, html);

    return fileName;

}

function saveNetwork(networkLogs) {

    const folder = path.join(__dirname, "../artifacts/network");

    ensureDirectory(folder);

    const fileName = generateFileName("network", "json");

    const filePath = path.join(folder, fileName);

    fs.writeFileSync(
        filePath,
        JSON.stringify(networkLogs, null, 2)
    );

    return fileName;

}

module.exports = {

    saveScreenshot,

    saveHTML,

    saveNetwork

};