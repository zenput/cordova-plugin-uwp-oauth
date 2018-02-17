/**
 * Open an authorization webview and call the success callback with the result response data upon successful redirect
 *
 * @param success - function
 * @param error - function
 * @param params - {}
 *  - requestUri: Open this Uri in a webview for authentication
 *  - redirectUri: what is the return redirectUri
 *  @returns: calls success with {error: error_val, redirectUrl: {string} };
 */
function open(success, error, params) {
    // cordova passes this in as an array
    params = params[0];
    var options = Windows.Security.Authentication.Web.WebAuthenticationOptions.none;
    if (!params.redirectUri) {
        throw "You must pass in a redirectUri in the parameters";
    }
    if (!params.redirectUri) {
        throw "You must pass in a requestUri in the parameters";
    }
    var callbackUri = new Windows.Foundation.Uri(params.redirectUri);
    var requestUri = new Windows.Foundation.Uri(params.requestUri);

    Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(options, requestUri, callbackUri).done(function (result) {
        if (result.responseData == "") {
            success({error: "An error has occurred.", redirectUrl: null});
        } else {
            success({error: null, redirectUrl: result.responseData});
        }
    }, function (err) {
        success({error: err, redirectUrl: null});
    });
}

UWPOAuth = {
    open: function (success, error, params) {
        open(success, error, params[0]);
    }
};

require("cordova/exec/proxy").add("UWPOAuth", UWPOAuth);