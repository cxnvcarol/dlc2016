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
    console.log(curMinDist / 1000);
    return curMinDist / 1000;
};

getTimeTillNextFlight("LH915");

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

function FraportGates() {
    this.test;
    $.ajax({
        headers: {Authorization: fraportCheckinsAuthorization},
        url: "https://developer.fraport.de/api/gates/1.0/gates",
        dataType: "json",
        async: false,
        success: function (result) {
            test = result;
            console.log(result.length);
            console.log(result);
            console.log("Successfully loaded all gate data");
        }
    });
    this.data = test;
    this.gatesByName = {};
    for (var i in this.data) {
        this.gatesByName[this.data[i]["gate"]["name"]] = this.data[i]["gate"];
    }
};

console.log("DataLoader script loaded");