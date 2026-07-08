exports.validate = async (page, finding, evidence) => {

    const network = evidence.networkSummary;

    return {

        verified: network.failedRequests > 0,

        failedRequests: network.failedRequests,

        clientErrors: network.clientErrors,

        serverErrors: network.serverErrors

    };

};