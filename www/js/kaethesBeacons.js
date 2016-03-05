
// set Beacon data
var beaconData = "";

$.ajax({
    url: "https://cube.api.aero/atibeacon/beacons/1?airportCode=FRA&app_id=fe56f70a&app_key=a5eaa885ac1c5b96999679f8e5cb9af9",
    airportCode:"FRA",
    async:false,
    success: function(data){beaconData = data;console.log("successfully loaded beacon data.")}
});

// initialize background maps
var tileData_0 ="";

$.ajax({
    url: "img/0/metadata.json",
    async:false,
    success: function(dataTile){tileData_0 = dataTile;console.log("successfully loaded tile data.")}
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
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

    circleArray = [];
    circleArray.length = 0;

    var counter = 0;
    for(var test in beaconData)
    {
        if(beaconData[test].latitude != undefined) {
            if(beaconData[test].floor == currentFloor) {
                circleArray.push(new L.circle([beaconData[test].latitude, beaconData[test].longitude], 15, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5
                }));
                leafletMap.addLayer(circleArray[counter]);
                circleArray[counter].bindPopup(beaconData[test].name);
                counter++;
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


addBeaconToMap();