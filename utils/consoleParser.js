exports.parseConsole = (consoleLogs) => {

    const errors = consoleLogs.filter(
        log => log.type === "error"
    );

    const warnings = consoleLogs.filter(
        log => log.type === "warning"
    );

    const info = consoleLogs.filter(
        log => log.type === "info"
    );

    return {

        totalLogs: consoleLogs.length,

        totalErrors: errors.length,

        totalWarnings: warnings.length,

        totalInfo: info.length,

        errors,

        warnings

    };

};