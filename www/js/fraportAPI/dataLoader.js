/**
 * Created by Nils Feige on 05.03.2016.
 */
var fraportCheckinsAuthorization = "Bearer 8c62c669ac72dad461cc6292a5123479";

function parseDateString(dateString) {
    var pat = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)Z/;
    var res = pat.exec(dateString);
    return new Date(res[1], res[2] - 1, res[3], res[4], res[5], res[6]);
};

function FraportCheckins() {
 //   console.log(fraportCheckinsAuthorization);
    this.test;
    $.ajax({
        headers : { Authorization : fraportCheckinsAuthorization },
        url : "https://developer.fraport.de/api/checkininfo/1.0/checkininfo",
        dataType : "json",
        async : false,
        success : function(data) {
            test = data;
            //console.log(typeof data);
            console.log("Successfully loaded all checkin info.");
        }
    });
    this.data = test;

    this.airlineAbbrevByName = {};
    this.airlineNameByAbbrev = {};
    this.airlineNameList  = [];
    this.checkinByAirlineName = {};

    var i = 0;
    for (var airlinedataset in this.data) {
        var airlineData = this.data[airlinedataset];
        var actualAirline = airlineData["airline"];
        this.airlineNameList[i] = actualAirline["name"];
        this.airlineNameByAbbrev[actualAirline["iataCode"]] = actualAirline["name"];
        this.airlineAbbrevByName[actualAirline["name"]] = actualAirline["iataCode"];
        this.checkinByAirlineName[actualAirline["name"]] = actualAirline["checkIns"][0]["checkIn"];
        i++;
    }
    console.log("fraport checkins called");
};

function loadArrivalDataForAirport(airportAbbrev) {
    //   console.log(fraportCheckinsAuthorization);
    var data = "";
    $.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/flights/1.0/flight/" + airportAbbrev + "/arrival",
        dataType: "json",
        async: false,
        success: function (result) {
            data = result;
            // console.log(typeof result);
            console.log("Successfully loaded all arrival data for " + airportAbbrev);
        }
    });
    return data;
};

function loadDepartureDataForAirport(airportAbbrev) {
    //   console.log(fraportCheckinsAuthorization);
    var data = "";
    $.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/flights/1.0/flight/" + airportAbbrev + "/departure",
        dataType: "json",
        async: false,
        success: function (result) {
            data = result;
            // console.log(typeof result);
            console.log("Successfully loaded all arrival data for " + airportAbbrev);
        }
    });
    return data;
};

function loadAllFlightsByAirline(airlineAbbrev) {
    var data = "";
    $.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/flights/1.0/flightDetails/" + airlineAbbrev,
        dataType: "json",
        async: false,
        success: function (result) {
            data = result;
            // console.log(typeof result);
            console.log("Successfully loaded all flight data for airline" + airlineAbbrev);
        }
    });
    return data;
};

function loadFlightDetailsForFlights(airlineAbbrev, flightNumber) {
    var data = "";
    $.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/flights/1.0/flightDetails/" + airlineAbbrev + "/"+ flightNumber,
        dataType: "json",
        async: false,
        success: function (result) {
            data = result;
            console.log("Successfully loaded all flights with airline " + airlineAbbrev + " and flight number " + flightNumber);
        }
    });
    return data;
};

function getFlightInformationForNextFlight(flightNumberString) {
    var pat = /(^\D+)(\d+$)/;
    var res = pat.exec(flightNumberString);


    var airlineAbbrev = res[1];
    var flightNumber = res[2];

    var curDate = new Date();
    var curMinDist = 100000000000;

    var flightsWithCorrectNumber = loadFlightDetailsForFlights(airlineAbbrev, flightNumber);
    console.log(flightsWithCorrectNumber);
    var closestFlightInFuture;
    for (var i = 0; i < flightsWithCorrectNumber.length; i++) {
        var flightObject = flightsWithCorrectNumber[i]["flight"];
        var arrivalTimeString = flightObject["departure"]["scheduled"];
        var arrivalTime = parseDateString(arrivalTimeString);
        var diff = arrivalTime - curDate;
        if (diff > 0 && diff < curMinDist) {
            curMinDist = diff;
            closestFlightInFuture = flightObject;
        }
    }

    return closestFlightInFuture;
}

function getTimeTillNextFlight(flightNumberString) {
    var pat = /(^\D+)(\d+$)/;
    var res = pat.exec(flightNumberString);

    var airlineAbbrev = res[1];
    var flightNumber = res[2];

    var curDate = new Date();
    var curMinDist = 100000000000;

    var flightsWithCorrectNumber = loadFlightDetailsForFlights(airlineAbbrev, flightNumber);
    console.log(flightsWithCorrectNumber);
    var closestFlightInFuture;
    for (var i = 0; i < flightsWithCorrectNumber.length; i++) {
        var flightObject = flightsWithCorrectNumber[i]["flight"];
        var arrivalTimeString = flightObject["departure"]["scheduled"];
        var arrivalTime = parseDateString(arrivalTimeString);
        var diff = arrivalTime - curDate;
        if (diff > 0 && diff < curMinDist) {
            curMinDist = diff;
            closestFlightInFuture = flightObject;
        }
    }
    return curMinDist / 1000;
};

function loadFlightDetailsForFlight(airlineAbbrev, flightNumber, dateString) {
    var data = "";
    $.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/flights/1.0/flightDetails/" + airlineAbbrev + "/" + flightNumber + "/" + dateString,
        dataType: "json",
        async: false,
        success: function (result) {
            data = result;
            // console.log(typeof result);
            console.log("Successfully loaded flight details for flight" + airlineAbbrev + "" + flightNumber + " on date " + dateString);
        }
    });
    return data[0]["flight"];
};

var staticTransitsData = {};

function FraportTransits() {
    var data;
    var deleg1=$.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/transittimes/1.0/transittime/",
        dataType: "json",
        async: true,
        success: function (result) {
            data = result;

            var j = 0;
            for (var i in data) {
                j++;
                var startSiteName = data[i]["path"]["startingPoint"]["name"];
                var endSiteName = data[i]["path"]["destination"]["name"];
                var distance = data[i]["path"]["distance"];
                var transitTime = data[i]["path"]["transitTime"];
                if (undefined == staticTransitsData[startSiteName]) {
                    staticTransitsData[startSiteName] = data[i]["path"]["startingPoint"];
                }
                if (undefined == staticTransitsData[endSiteName])
                    staticTransitsData[endSiteName] = data[i]["path"]["destination"];
                staticTransitsData[startSiteName][endSiteName] = { distance : distance, transitTime : transitTime };
                staticTransitsData[endSiteName][startSiteName] = { distance : distance, transitTime : transitTime };
            }
        }
    });

    var waitingTimeData = "";
    var deleg2=$.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/waitingperiods/1.0/waitingperiod",
        dataType: "json",
        async: true,
        success: function (result) {
            waitingTimeData = result;
            console.log("Successfully loaded all waiting times");
        }
    });

    $.when(deleg1,deleg2).done(function()
    {
        for (var waitingDataContainer in waitingTimeData) {
            var processsite = waitingTimeData[waitingDataContainer]["processSite"];
            staticTransitsData[processsite["name"]]["hasWaitingTime"] = true;
        }
    });

};

function getCurrentWaitingTime(siteName) {
    var waitingTimeData = "";
    $.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/waitingperiods/1.0/waitingperiod/" + siteName,
        dataType: "json",
        async: false,
        success: function (result) {
            waitingTimeData = result;
            console.log(result);
            console.log("Successfully loaded waiting times for: " + siteName);
        }
    });

    return waitingTimeData[0]["processSite"]["waitingTime"]["currentWait"];
}

function toRadians(angle) {
    return Math.PI * angle / 180;
}

function distanceBetweenPositions(lat1, long1, lat2, long2) {
    var R = 6371000; // metres
    var deltaPhi = lat2-lat1;
    var deltaLambda = long2-long1;

    var a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
        Math.cos(lat1) * Math.cos(lat1) *
        Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
};

FraportTransits.prototype = {
    getSiteNearestToMe : function(longitude, latitude) {
        var smalledstDistance = 1000000000000;
        var curClosestSite;
        for (var site in this.allSites) {
            var siteLong = site["longitude"];
            var siteLat  = site["latitude"];
            var dist = distanceBetweenPositions(siteLat, siteLong, latitude, longitude);
            if (dist < smallestDistance) {
                curClosestSite = this.allSites[site];
                smalledstDistance = dist;
            }
        }
        return curClosestSite;
    },
    getSitesInTimeRadiusSmaller : function (longitude, latitude, time) {
        var results = [];
        var closestSite = this.getSiteNearestToMe(longitude, latitude);
        for (var sitename in this.allSites) {
            if (sitename[closestSite["name"]] != undefined) {
                var dist = sitename[closestSite["name"]].transitTime;
                if (dist < time) {
                    results.push(this.allSites[sitename]);
                }
            }
        }
        return results;
    },
    getSitesInDistanceSmaller: function (longitude, latitude, distance) {
        var results = [];
        var closestSite = this.getSiteNearestToMe(longitude, latitude);
        for (var sitename in this.allSites) {
            if (sitename[closestSite["name"]] != undefined) {
                var dist = distanceBetweenPositions(latitude, longitude, closestSite.latitude, closestSite.longitude);
                if (dist < distance) {
                    results.push(this.allSites[sitename]);
                }
            }
        }
        return results;
    }
};

function FraportGates() {
    this.test;
    $.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/gates/1.0/gates",
        dataType: "json",
        async: false,
        success: function (result) {
            test = result;
            console.log("Successfully loaded all gate data");
        }
    });
    this.data = test;
    this.gatesByName = {};
    for (var i in this.data) {
        this.gatesByName[this.data[i]["gate"]["name"]] = this.data[i]["gate"];
    }
}

console.log("DataLoader script loaded");