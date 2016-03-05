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

var leafletMap1 = L.map('quest1map').fitBounds(mapBounds);
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletMap1);




// draw fraport data on the map

function addFraPositionsToMap()
{
    //leafletMap1.remove();
    //leafletMap1 = L.map('map').fitBounds(mapBounds);
    /*L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
     maxZoom: 18,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(leafletMap1);*/


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
    leafletMap1.remove();
    leafletMap1 = L.map('quest1map').fitBounds(mapBounds);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap1);

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

    aPointOnTheMap = new L.circle([lat, long], 5, {
        color: color,
        fillColor: color,
        fillOpacity: 0.5
    });
    leafletMap1.addLayer(aPointOnTheMap);
    aPointOnTheMap.bindPopup(name);
}

function removePoint(pointInstance)
{
    leafletMap1.removeLayer(pointInstance);
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
    ]).addTo(leafletMap1);
}

function removeArrow(triInstance)
{
    triInstance.removeLayer(leafletMap1);
}


function drawMarkerOnMap(lat, lng, name, icon)
{
    //alert("position: "+app.currentPosition);
    removeMarker(aPointOnTheMap);
    var myIcon = L.icon({
        iconUrl: icon
    });

    aPointOnTheMap =  new L.marker([lat, lng]).addTo(leafletMap1);
    aPointOnTheMap.setIcon(myIcon);
    aPointOnTheMap.bindPopup(name);
    //alert("map updated");
    return aPointOnTheMap;
}
function removeMarker(m)
{
    if(m){
        leafletMap1.removeLayer(m);
    }
}


function initiateSpecialQuest(flightNumber)
{


}


//addBeaconToMap();
//addFraPositionsToMap();
drawOnMap(50.04784854285611, 8.573498725891112, "bla", "blue");


// get lat and long of certain positions on the map
leafletMap1.on('click', function(a) {console.log("lat, long: " + a.latlng.lat + "," + a.latlng.lng);});
