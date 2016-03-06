/**
 * Created by Nils Feige on 05.03.2016.
 */

var DB_Base_URL = "https://open-api.bahn.de/bin/rest.exe";
var authKey_ = "DBholm0216";
var defaultParameters = "?authKey=" + authKey_ + "&format=json&lang=de&";

function getTrainStationsByName(nameString) {
    var serviceURL = "/location.name";

    var trainStationData = "";
    $.ajax({
        url: DB_Base_URL + serviceURL + defaultParameters + "input=" + nameString,
        headers : { authKey : authKey_ },
        dataType: "json",
        async: false,
        success: function (result) {
            trainStationData = result;
            console.log("Successfully loaded trainStations for namestring: " + nameString);
        }
    });
    return trainStationData;
}

function getDepartureTable(stationID, date, time) {
    var serviceURL = "/departureBoard";
    var departureTableData = "";
    var urlString = DB_Base_URL + serviceURL + defaultParameters + "id=" + stationID + (date != undefined ? ("&date=" + date) : "") + ((time != undefined) ? "&time=" + time : "");
    $.ajax({
        url: urlString,
        headers : { authKey : authKey_ },
        dataType: "json",
        async: false,
        success: function (result) {
            departureTableData = result["DepartureBoard"]["Departure"];
            console.log("Successfully loaded departure table for " + stationID + " and date " + date + " and time " + time);
        }
    });
    return departureTableData;
}

function getArrivalTable(stationID, date, time) {
    var serviceURL = "/arrivalBoard";
    var arrivalTableData = "";
    var urlString = DB_Base_URL + serviceURL + defaultParameters + "id=" + stationID + (date != undefined ? ("&date=" + date) : "") + ((time != undefined) ? "&time=" + time : "");
    $.ajax({
        url: urlString,
        headers : { authKey : authKey_ },
        dataType: "json",
        async: false,
        success: function (result) {
            arrivalTableData = result["ArrivalBoard"]["Arrival"];
            console.log("Successfully loaded arrival table for " + stationID + " and date " + date + " and time " + time);
        }
    });
    return arrivalTableData;
}

function getJourneyDetailsForArrivalOrDeparture(arrivalOrDeparture) {
    var urlString = arrivalOrDeparture["JourneyDetailRef"]["ref"];
    var journeyData = "";
    console.log("URL STRING: " + urlString);
    $.ajax({
        url: urlString,
        headers : { authKey : authKey_ },
        dataType: "json",
        async: false,
        success: function (result) {
            journeyData = result["JourneyDetail"];
            console.log("Successfully loaded Journey details for journey" + arrivalOrDeparture);
        }
    });

    return journeyData;
}

function getTimeToNextDeparture(trainName) {
    var date = new Date();
    var tstring = "2016-" + (date.getMonth() + 1) + "-" + date.getDate();
    var trainStations = getTrainStationsByName("Frankfurt(M) Flughafen Fernbf");
    var trainTime;
    var stoplocations = trainStations["LocationList"]["StopLocation"];
    for (var trainStation in stoplocations) {
        var departureTable = getDepartureTable(stoplocations[trainStation]["id"], tstring);
        for (var departure in departureTable) {
            if (departureTable[departure]["name"] == trainName) {
                trainTime = departureTable[departure]["time"];
                break;
            }
        }
       if (trainTime != undefined) {
            break ;
       }
    }
    var restime = trainTime.split(":");
    var otherDate = new Date(2016, date.getMonth(), date.getDate(), restime[0], restime[1]);

    return otherDate-date;
}

getTimeToNextDeparture("ICE 717"); /// 717, 699
//console.log("Departures");
//console.log(getDepartureTable("008070003"));
//console.log("Arrivals");
//console.log(getArrivalTable("008070003"));
//console.log("journeyData");
//console.log(getJourneyDetailsForArrivalOrDeparture(getArrivalTable("008070003")[0]));
//console.log(getJourneyDetailsForArrivalOrDeparture(getDepartureTable("008070003")[0]));