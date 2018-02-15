function open(success, error, params) {

    var options = Windows.Security.Authentication.Web.WebAuthenticationOptions.none;
    var callbackUri = new Windows.Foundation.Uri(params.redirectUri);
    var requestUri = new Windows.Foundation.Uri(params.requestUri);

    Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(options, requestUri, callbackUri).done(function (result) {
        console.log(result);

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