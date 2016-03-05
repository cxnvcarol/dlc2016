/**
 * Created by mzeyen on 3/5/16.
 */
var QRCodeScanner = {
    scan: function() {
        cordova.plugins.barcodeScanner.scan(
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