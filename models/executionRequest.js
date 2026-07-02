exports.validateExecutionRequest = (body) => {

    const errors = [];

    if (!body.executionId)
        errors.push("executionId is required");

    if (!body.project)
        errors.push("project is required");

    if (!body.environment)
        errors.push("environment is required");

    if (!body.testType)
        errors.push("testType is required");

    if (!body.url)
        errors.push("url is required");

    return {
        valid: errors.length === 0,
        errors
    };

};