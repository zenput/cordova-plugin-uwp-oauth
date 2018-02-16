/**
 * Open an authorization webview and call the success callback with the result response data upon successful redirect
 *
 * @param success - function
 * @param error - function
 * @param params - {}
 *  - requestUri: Open this Uri in a webview for authentication
 *  - redirectUri: what is the return redirectUri
 */
function open(success, error, params) {

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
            success("An error has occurred.", null);
        } else {
            success(null, result.responseData);
        }
    }, function (err) {
        success(err, null);
    });
}

UWPOAuth = {
    open: function (success, error, params) {
        open(success, error, params);
    }
};

require("cordova/exec/proxy").add("UWPOAuth", UWPOAuth);