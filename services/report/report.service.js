const fs = require("fs");
const path = require("path");

exports.generate = async (result) => {

    const reportId =
        result.execution.executionId || Date.now();

    const reportDirectory = path.join(
        __dirname,
        "../../reports"
    );

    if (!fs.existsSync(reportDirectory)) {

        fs.mkdirSync(reportDirectory, {
            recursive: true
        });

    }

    // -----------------------
    // JSON REPORT
    // -----------------------

    const jsonFile =
        `${reportId}.json`;

    fs.writeFileSync(

        path.join(reportDirectory, jsonFile),

        JSON.stringify(result, null, 4)

    );

    // -----------------------
    // HTML REPORT
    // -----------------------

    const htmlFile =
        `${reportId}.html`;

    const html = `<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>AI QA Report</title>

<style>

body{

font-family:Arial;

margin:40px;

background:#f7f7f7;

}

.card{

background:white;

padding:20px;

margin-bottom:20px;

border-radius:8px;

box-shadow:0 0 8px rgba(0,0,0,.1);

}

h1{

color:#333;

}

table{

width:100%;

border-collapse:collapse;

}

td,th{

border:1px solid #ddd;

padding:10px;

}

th{

background:#efefef;

}

pre{

white-space:pre-wrap;

}

</style>

</head>

<body>

<h1>AI QA REPORT</h1>

<div class="card">

<h2>Execution</h2>

<table>

<tr>

<th>Status</th>

<td>${result.execution.status}</td>

</tr>

<tr>

<th>Execution ID</th>

<td>${result.execution.executionId}</td>

</tr>

<tr>

<th>Title</th>

<td>${result.execution.title}</td>

</tr>

<tr>

<th>Screenshot</th>

<td>${result.execution.screenshot}</td>

</tr>

</table>

</div>

<div class="card">

<h2>Evidence</h2>

<pre>

${JSON.stringify(result.evidence,null,4)}

</pre>

</div>

<div class="card">

<h2>AI Analysis</h2>

<pre>

${JSON.stringify(result.aiAnalysis,null,4)}

</pre>

</div>

</body>

</html>`;

    fs.writeFileSync(

        path.join(reportDirectory, htmlFile),

        html

    );

    return {

        jsonReport: jsonFile,

        htmlReport: htmlFile

    };

};