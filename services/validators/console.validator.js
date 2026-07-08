exports.validate = async (page, finding, evidence) => {

    const consoleSummary = evidence.consoleSummary;

    return {

        verified: consoleSummary.totalErrors > 0,

        totalErrors: consoleSummary.totalErrors,

        totalWarnings: consoleSummary.totalWarnings

    };

};