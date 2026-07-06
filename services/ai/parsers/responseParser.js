exports.parse = (responseText) => {

    try {

        return JSON.parse(responseText);

    }

    catch (error) {

        throw new Error(
            "AI returned invalid JSON."
        );

    }

};