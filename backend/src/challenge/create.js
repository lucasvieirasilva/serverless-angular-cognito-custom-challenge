exports.handler = (event, context, callback) => {
    if (event.request.challengeName == 'CUSTOM_CHALLENGE') {
        event.response.publicChallengeParameters = {};
        event.response.privateChallengeParameters = {};
        event.response.privateChallengeParameters.answer = 'test';
        event.response.challengeMetadata = 'CAPTCHA_CHALLENGE';
    }

    callback(null, event);
}