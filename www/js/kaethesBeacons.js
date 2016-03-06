// set airport data
var positionDataFra = new FraportTransits();
var circleArrayFrapos = new Array();


// set Beacon data
var beaconData = "";

$.ajax({
    url: "https://cube.api.aero/atibeacon/beacons/1?airportCode=FRA&app_id=fe56f70a&app_key=a5eaa885ac1c5b96999679f8e5cb9af9",
    airportCode:"FRA",
    async:false,
    success: function(data){beaconData = data;console.log("successfully loaded beacon data.")}
});



// initialize map drawing stuff

var mapBounds = new L.LatLngBounds(
    new L.LatLng(50.040178, 8.556086),
    new L.LatLng(50.056731, 8.597244));

var leafletMap = L.map('map').fitBounds(mapBounds);

var maptoFix=leafletMap;

var leafletMap1 = L.map('quest1map').fitBounds(mapBounds);
var leafletMap2 = L.map('quest2map').fitBounds(mapBounds);
var leafletMap3 = L.map('quest3map').fitBounds(mapBounds);
var leafletMap4 = L.map('quest4map').fitBounds(mapBounds);
var leafletMapInfo = L.map('mapInfo').fitBounds(mapBounds);

//var tilesLayer=
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletMap);


L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletMap1);

L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletMap2);

L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletMap3);

L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletMap4);

L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletMapInfo);


//tilesLayer.addTo(leafletMap);

/*
tilesLayer.addTo(leafletMap1);
tilesLayer.addTo(leafletMap2);
tilesLayer.addTo(leafletMap3);
tilesLayer.addTo(leafletMap4);
tilesLayer.addTo(leafletMapInfo);
*/


// draw fraport data on the map

function addFraPositionsToMap()
{
    //leafletMap.remove();
    //leafletMap = L.map('map').fitBounds(mapBounds);
    /*L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);*/


    for(var test in positionDataFra.allSites)
    {
        var site = positionDataFra.allSites[test];
        if(site.terminal != null && site.latitude != undefined) {
            drawOnMap(site.latitude, site.longitude, site.name, 'blue');
        }
    }
}









var currentFloor = 0;
var circleArray = new Array();


// draw map depending on floor
function addBeaconToMap()
{
    leafletMap.remove();
    leafletMap = L.map('map').fitBounds(mapBounds);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);

    circleArray = [];
    circleArray.length = 0;

    var counter = 0;
    for(var test in beaconData)
    {
        if(beaconData[test].latitude != undefined) {
            if(beaconData[test].floor == currentFloor) {
                drawOnMap(beaconData[test].latitude, beaconData[test].longitude, beaconData[test].name, 'blue');
            }
        }
    }

    console.log("array length: " + circleArray.length);
}

function goOneFloorUp()
{
    if(currentFloor < 3) currentFloor++;
    console.log(currentFloor);
    $("#floorTeller").text(currentFloor);
    addBeaconToMap();
}

function goOneFloorDown()
{
    if(currentFloor > -1) currentFloor--;
    console.log(currentFloor);
    $("#floorTeller").text(currentFloor);
    addBeaconToMap();
}


// generic draw on map function
var aPointOnTheMap;
function drawOnMap(lat, long, name, color)
{
    if(aPointOnTheMap != null) {removePoint(aPointOnTheMap)};

    aPointOnTheMap = new L.circle([lat, long], 8, {
        color: color,
        fillColor: color,
        fillOpacity: 0.5
    });
    leafletMap.addLayer(aPointOnTheMap);
    aPointOnTheMap.bindPopup(name);
}

function removePoint(pointInstance)
{
    leafletMap.removeLayer(pointInstance);
}



// generic triangle drawing function
var polygon;
function drawArrow(spitze_lat, spitze_long, hinten1_lat, hinten1_long, hinten2_lat, hinten2_long)
{
    if(polygon != null) {removeArrow(polygon)};

    polygon = L.polygon([
        [spitze_lat, spitze_long],
        [hinten1_lat, hinten1_long],
        [hinten2_lat, hinten2_long]
    ]).addTo(leafletMap);
}

function removeArrow(triInstance)
{
    triInstance.removeLayer(leafletMap);
}

var marker1,
    marker2,
    marker3,
    marker4,
    marker5,
    marker6;
function drawMarkerOnMap(lat, lng, name, icon)
{

    removeMarker(marker1,leafletMap);
    var myIcon = L.icon({
        iconUrl: icon
    });
    marker1 =  new L.marker([lat, lng]).addTo(leafletMap);
    marker1.setIcon(myIcon);
    marker1.bindPopup(name);
    marker1.addTo(leafletMap);
    leafletMap.setView(marker1.getLatLng());

    removeMarker(marker2,leafletMap1);
    myIcon = L.icon({
        iconUrl: icon
    });
    marker2 =  new L.marker([lat, lng]).addTo(leafletMap1);
    marker2.setIcon(myIcon);
    marker2.bindPopup(name);
    marker2.addTo(leafletMap1);
    leafletMap1.setView(marker2.getLatLng());



    removeMarker(marker3,leafletMap2);
    myIcon = L.icon({
        iconUrl: icon
    });
    marker3 =  new L.marker([lat, lng]).addTo(leafletMap2);
    marker3.setIcon(myIcon);
    marker3.bindPopup(name);
    marker3.addTo(leafletMap2);
    leafletMap2.setView(marker3.getLatLng());

    removeMarker(marker4,leafletMap3);
    myIcon = L.icon({
        iconUrl: icon
    });
    marker4 =  new L.marker([lat, lng]).addTo(leafletMap3);
    marker4.setIcon(myIcon);
    marker4.bindPopup(name);
    marker4.addTo(leafletMap3);
    leafletMap3.setView(marker4.getLatLng());

    removeMarker(marker5,leafletMap4);
    myIcon = L.icon({
        iconUrl: icon
    });
    marker5 =  new L.marker([lat, lng]).addTo(leafletMap4);
    marker5.setIcon(myIcon);
    marker5.bindPopup(name);
    marker5.addTo(leafletMap4);
    leafletMap4.setView(marker5.getLatLng());

    removeMarker(marker6,leafletMapInfo);
    myIcon = L.icon({
        iconUrl: icon
    });
    marker6 =  new L.marker([lat, lng]).addTo(leafletMapInfo);
    marker6.setIcon(myIcon);
    marker6.bindPopup(name);
    marker6.addTo(leafletMapInfo);
    leafletMapInfo.setView(marker6.getLatLng());

    return aPointOnTheMap;
}


function removeMarker(m,map)
{
    if(m){
        map.removeLayer(m);
    }
}





// Quest-related objects and functions

var destination = {
    isFinalQuest : false,
    coordinates : {
        latitude : 5,
        longitude : 6
    },
    gameFlag: true
}


// ... for example, a list of restrooms in the airport
var restrooms =
{
    toiletsObjects : [
        {
            name: "RR1",
            position: {
                latitude: 50.04359408999003,
                longitude: 8.561868667602537
            }
        },

        {
            name: "RR2",
            position: {
                latitude: 50.04798288785706,
                longitude: 8.56355309486389
            }
        },

        {
            name: "RR3",
            position: {
                latitude: 50.04860638152871,
                longitude: 8.565446734428406
            }
        },

        {
            name: "RR4",
            position: {
                latitude:  50.047087247414225,
                longitude: 8.567925095558167
            }
        },

        {
            name: "RR5",
            position: {
                latitude:  50.04712514023309,
                longitude: 8.572195172309875
            }
        },

        {
            name: "RR6",
            position: {
                latitude:  50.04800355628536,
                longitude: 8.575649857521057
            }
        },

        {
            name: "RR7",
            position: {
                latitude:  50.05023913873106,
                longitude: 8.573150038719177
            }
        },

        {
            name: "RR8",
            position: {
                latitude:  50.05107271909004,
                longitude: 8.575488924980164
            }
        },

        {
            name: "RR9",
            position: {
                latitude:  50.04942965634377,
                longitude: 8.580633401870728
            }
        },

        {
            name: "RR10",
            position: {
                latitude:  50.051672061309354,
                longitude: 8.588658571243286
            }
        },

        {
            name: "RR11",
            position: {
                latitude:  50.049829232334965,
                longitude: 8.568697571754456
            }
        }
]
};








function setGameFlagToTrue()
{
    destination.gameFlag = true;
}

function setGameFlagToFalse()
{
    destination.gameFlag = false;
}

function setFinalQuestFlagToTrue()
{
    destination.isFinalQuest = true;
}

function getQuestDestinationByName(questName)
{
    for (var quest in TargetDB.targets)
    {
        if(TargetDB.targets[quest].name == questName)
        {
            destination.coordinates.latitude = TargetDB.targets[quest].position.latitude;
            destination.coordinates.longitude = TargetDB.targets[quest].position.longitude;
        }

        if(destination.isFinalQuest == true) {
            drawOnMap(destination.coordinates.latitude, destination.coordinates.longitude, questName, "red");
        }
    }
}

// get lat and long of certain positions on the map
leafletMap.on('click', function(a) {console.log("lat, long: " + a.latlng.lat + "," + a.latlng.lng);});
