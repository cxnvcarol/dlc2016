/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        //window.locationManager = cordova.plugins.locationManager;
        app.startScanForBeacons();
        //initializeHtmlComponents();


        //Other initializations should be before this line:
        console.log("before received event");
        app.receivedEvent('deviceready');
        console.log("after receiving the event");//this line is never executed.

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getVertices(region) {
    //$('#msg').text("getting vertices");
    var index=parseInt(region.identifier);
    $('#msg').text(JSON.stringify(app.beaconRegions[index]));
    var returned=[app.beaconRegions[index].latitude,app.beaconRegions[index].longitude];
    //alert("returned: "+JSON.stringify(returned));
    return returned;
}
function recalculatePosition() {

    var vertices=[];

    if(app.sensedRegions.length==1)
    {
        return getVertices(app.sensedRegions[0]);
    }
    if(app.sensedRegions==0)
    {
        return app.currentPosition;
    }
    app.sensedRegions.forEach(function(reg)
    {
        var myv=getVertices(reg);
        vertices.push(myv);

    });
    var polygon= L.polygon(vertices);
    var center=polygon.getBounds().getCenter();
    app.currentPosition=[center.lat,center.lng];
    $('#mypos').text("pos: "+app.currentPosition);


}
app.startScanForBeacons = function()
{
    console.log('startScanForBeacons!');

    // The delegate object contains iBeacon callback functions.
    // The delegate object contains iBeacon callback functions.

    var delegate = new cordova.plugins.locationManager.Delegate();


    delegate.didDetermineStateForRegion = function(pluginResult)
    {
        console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
        var state=pluginResult.state;
        var reg=pluginResult.region;
        if(state=="CLRegionStateInside")
        {
            addIfNotFound(app.sensedRegions,reg);

        }
        else if(state=="CLRegionStateOutside")
        {
            removeIfFound(app.sensedRegions,reg);
        }
        //alert('didDetermineStateForRegion: ' + JSON.stringify(pluginResult.region));
        $('#dummie').text(($('#dummie').text())+".");
        $('#sensed').text(JSON.stringify(app.sensedRegions));

        recalculatePosition();

    };

    delegate.didStartMonitoringForRegion = function(pluginResult)
    {
        console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));


    };

    delegate.didRangeBeaconsInRegion = function(pluginResult)
    {
        //console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
        //app.didRangeBeaconsInRegion(pluginResult)
    };

    // Set the delegate object to use.
    cordova.plugins.locationManager.setDelegate(delegate);


    // Start monitoring and ranging our beacons.

    $.get("https://cube.api.aero/atibeacon/beacons/1?airportCode=FRA&app_id=fe56f70a&app_key=a5eaa885ac1c5b96999679f8e5cb9af9",function(d){


        d.forEach(function(region,i){
            if(region.floor==null)
            {
                region.floor=0;
                //alert("a null floor fixed!");
            }
            if(region.latitude==undefined)
            {
                d.splice(i, 1);
            }
        });

        app.beaconRegions=d;
        app.currentPosition=[d[0].latitude,d[0].longitude];

        app.sensedRegions=[];
        for (var r in app.beaconRegions)
        {
            var region = app.beaconRegions[r];

            var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
                r, region.uuid, region.majorId, region.minorId);

            // Start monitoring.
            cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
                .fail(console.error)
                .done();

            // Start ranging.
            //locationManager.startRangingBeaconsInRegion(beaconRegion)
            //  .fail(console.error)
            //  .done()
        }

    });



};

// Display pages depending of which beacon is close.
/*
app.didRangeBeaconsInRegion = function(pluginResult)
{
    // There must be a beacon within range.
    if (0 == pluginResult.beacons.length)
    {
        return
    }

    // Our regions are defined so that there is one beacon per region.
    // Get the first (and only) beacon in range in the region.
    var beacon = pluginResult.beacons[0];

    // The region identifier is the page id.
    var pageId = pluginResult.region.identifier;

    //console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)

    // If the beacon is close and represents a new page, then show the page.
    if ((beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')
        && app.currentPage != pageId)
    {
        app.gotoPage(pageId)
        return
    }

    // If the beacon represents the current page but is far away,
    // then show the default page.
    if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')
        && app.currentPage == pageId)
    {
        app.gotoPage('page-default')
        return
    }
};
*/

function goTestPage()
{
    console.log("Alles gut!!");
    window.location="test.html";
}
function goGuiPage()
{
    console.log("Alles gut!!");
    window.location="gui.html";
}
function goHomePage()
{
    window.location="index.html";
}
function addIfNotFound(arr,obj)
{
    arr.forEach(function(r){
        //alert("identifier "+r.identifier);
        if(r.identifier==obj.identifier)
        {
            return;
        }
    });
    arr.push(obj);

}
function removeIfFound(arr,obj)
{
    arr.forEach(function(r,i){
        if(r.identifier==obj.identifier)
        {
            return arr.splice(i,1);
        }
    });

}