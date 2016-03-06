/**
 * Created by mzeyen on 3/5/16.
 */
var QRCodeScanner = {
    scan: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
            function(result) {
                if(!result.cancelled) {
                    return result;
                }
            },
            function(error) {
                alert('Scanning failed: ' + error);
            }
        );
    }
};