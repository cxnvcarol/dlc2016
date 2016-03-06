/**
 * Created by mzeyen on 3/5/16.
 */
var QRCodeScanner = {
    scan: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        var back;
        scanner.scan(
            function(result) {
                if(!result.cancelled) {
                    back = result.text;
                    //alert(result.text);
                    //return result;
                }
            },
            function(error) {
                alert('Scanning failed: ' + error);
            }
        );
        return back;
    }
};