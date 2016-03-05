// set airport data
var positionDataFra = new FraportTransits();
var circleArrayFrapos = new Array();

function addFraPositionsToMap()
{
    leafletMap.remove();
    leafletMap = L.map('map').fitBounds(mapBounds);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);


    for(var test in positionDataFra.allSites)
    {
        var site = positionDataFra.allSites[test];
        if(site.terminal != null && site.latitude != undefined) {
            drawOnMap(site.latitude, site.longitude, site.name, 'blue')
        }
    }
}




// set Beacon data
var beaconData = "";

$.ajax({
    url: "https://cube.api.aero/atibeacon/beacons/1?airportCode=FRA&app_id=fe56f70a&app_key=a5eaa885ac1c5b96999679f8e5cb9af9",
    airportCode:"FRA",
    async:false,
    success: function(data){beaconData = data;console.log("successfully loaded beacon data.")}
});


var mapBounds = new L.LatLngBounds(
    new L.LatLng(50.040178, 8.556086),
    new L.LatLng(50.056731, 8.597244));

var leafletMap = L.map('map').fitBounds(mapBounds);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

var tileOptions = {
    minZoom: 17,
    maxZoom: 21,
    tileSize: 256,
    opacity: 1.0,
    zIndex: 17,
    tms: false};


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
                drawOnMap(beaconData[test].latitude, beaconData[test].longitude, beaconData[test].name, 'red');
            }
        }
    }

    console.log("array length: " + circleArray.length);
}

function goOneFloorUp()
{
    if(currentFloor < 3) currentFloor++;
    console.log(currentFloor);
    addBeaconToMap();
}

function goOneFloorDown()
{
    if(currentFloor > -1) currentFloor--;
    console.log(currentFloor);
    addBeaconToMap();
}


// generic draw on map function
function drawOnMap(lat, long, name, color)
{
    aPointOnTheMap = new L.circle([lat, long], 5, {
        color: color,
        fillColor: color,
        fillOpacity: 0.5
    });
    leafletMap.addLayer(aPointOnTheMap);
    aPointOnTheMap.bindPopup(name);
}


addBeaconToMap();
addFraPositionsToMap();