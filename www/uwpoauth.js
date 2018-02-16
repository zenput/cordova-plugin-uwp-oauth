/**
 * An OAuth webview plugin for UWP cordova apps
 * 
 * Developed by Zenput
 */

var UWPOAuth = function() {

};


UWPOAuth.prototype.open = function(success, fail, params) {
	if (!params) {
		params= {};
	}

	return cordova.exec(success, fail, "UWPOAuth", "open", [params]);
};

window.cordova.UWPOAuth = new UWPOAuth();