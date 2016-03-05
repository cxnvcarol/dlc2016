/**
 * Created by Nils Feige on 05.03.2016.
 */

var DB_Base_URL = "https://open-api.bahn.de/bin/rest.exe";
var authKey_ = "DBholm0216";
var defaultParameters = "?authKey=" + authKey_ + "&format=json&lang=de&";

function getTrainStationsByName(nameString) {
    var serviceURL = "/location.name";

    var trainStationData = "";
    console.log($.ajax({
        url: DB_Base_URL + serviceURL + defaultParameters + "input=" + nameString,
        headers : { authKey : authKey_ },
        dataType: "json",
        async: false,
        success: function (result) {
            trainStationData = result;
            console.log(result);
            console.log("Successfully loaded trainStations for namestring: " + nameString);
        }
    }));
    return trainStationData;
}

function getDepartureTable(stationID, date, time) {
    var serviceURL = "/departureBoard";
    var departureTableData = "";
    console.log($.ajax({
        url: DB_Base_URL + serviceURL + defaultParameters + "id=" + stationID + "&date=" + date + "&time=" + time,
        headers : { authKey : authKey_ },
        dataType: "json",
        async: false,
        success: function (result) {
            departureTableData = result;
            console.log(result);
            console.log("Successfully loaded trainStations for namestring: " + nameString);
        }
    }));
    return departureTableData;
}

function getArrivalTable(stationID, date, time) {
    var serviceURL = "/arrivalBoard";
    var arrivalTableData = "";
    console.log($.ajax({
        url: DB_Base_URL + serviceURL + defaultParameters + "id=" + stationID + "&date=" + date + "&time=" + time,
        headers : { authKey : authKey_ },
        dataType: "json",
        async: false,
        success: function (result) {
            arrivalTableData = result;
            console.log(result);
            console.log("Successfully loaded trainStations for namestring: " + nameString);
        }
    }));
    return arrivalTableData;
}

//getTrainStationsByName("Frankfurt Hbf");
//getDepartureTable("008070003");
//getArrivalTable("008070003");