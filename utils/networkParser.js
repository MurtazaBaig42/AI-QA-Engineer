const fs = require("fs");

exports.parseNetwork = (networkFilePath) => {

    const networkLogs = JSON.parse(

        fs.readFileSync(networkFilePath, "utf8")

    );

    const responses = networkLogs.filter(

        item => item.type === "response"

    );

    const failedRequests = responses.filter(

        item => item.status >= 400

    );

    const clientErrors = responses.filter(

        item => item.status >= 400 &&
                item.status < 500

    );

    const serverErrors = responses.filter(

        item => item.status >= 500

    );

    return {

        totalRequests: responses.length,

        failedRequests: failedRequests.length,

        clientErrors: clientErrors.length,

        serverErrors: serverErrors.length,

        failedUrls: failedRequests.map(

            item => ({

                status: item.status,

                url: item.url

            })

        )

    };

};