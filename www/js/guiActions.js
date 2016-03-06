/**
 * Created by Diana on 05-Mar-16.
 */

//Get time left to catch connection
var shouldStopPlaying = false;

function displayFlightInfo(flightInfo) {
    //TODO Extract info to display nicer
    $("#flight-info").html(JSON.stringify(flightInfo));
}
function updateGoTarget(gateNumber) {
    var gate=getGateLocationByGateName(gateNumber);
    app.currentTarget=[gate.latitude,gate.longitude];
    try{
        app.drawCurrentTarget();
    }
    catch(e)
    {
        console.log("")
    }

}
function startCountdown() {
    window.location='#pass-time-left';
    var flightId = document.getElementById('con-info').value;
    var typeId = document.getElementById('flip-min').value;

    if(flightId)
    {
        flightId=flightId.trim();
    }

    var time=0;
    if(typeId =="flight"){
        time = getTimeTillNextFlight(flightId);
    }

    if(typeId =="train"){
        time = getTimeToNextDeparture(flightId);
        // function from DBBAhN var time = getTimeTillNextFlight(flightId);
    }

    if(app)
    {
        app.nextFlight=flightId;

    }
    var flightInfo=getFlightInformationForNextFlight(flightId);
    displayFlightInfo(flightInfo);
    updateGoTarget((flightInfo.departure?flightInfo.departure.gate:"A50")||"A50");
    var time = getTimeTillNextFlight(flightId);

    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time / 60) % 60);
    var seconds = Math.floor(time % 60);

    var tleft = hours + ":" + minutes + ":" + seconds;
    console.log(tleft);

    $('#time-left').html(tleft);

    var counter=0;

    setInterval(function(){
        time=time-1;
        counter++;
        if (time <= 3600) {  ///// TODO compute traveltime distance from you to the gate and perhaps even the delay through customs/security
            shouldStopPlaying = true;
            $('.ui-page').css("background", "rgba(255,0,0,0.5)");

            if(counter%30==0)
            {
                alert("YOU ARE RUNNING OUT OF TIME: Prepare for your final quest");
            }
        }
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time / 60) % 60);
        var seconds = Math.floor(time % 60);
        var tleft = hours + ":" + minutes + ":" + seconds;

        $('.ui-counter').html(tleft);

    },1000);

}


function populateQuests() {
    var pos = {
        lati: app.currentPosition[0],
        long: app.currentPosition[1]
    };
    console.log(pos);
    var questList = Quest.acquire(0, {lati: app.currentPosition[0], long: app.currentPosition[1]});
    console.log(questList);
    $('#q1').html(TargetDB.targets[questList[0]].title);
    $('#q1').click(function() {
        getQuestDestinationByName(TargetDB.targets[questList[0]].name);
        Game.log.currentTarget = questList[0];
        app.currentTarget = [destination.coordinates.latitude, destination.coordinates.longitude];
    });
    $('#pq1').html(TargetDB.targets[questList[0]].descr);
    $('#qrs1').click(function() {
        QRCodeScanner.scan();
        /*alert(code);
        var pid = QRCodeMapping[code];
        //alert(pid);
        var value = Quest.finish(pid, Game.log.currentTarget);
        alert(value);
        if(value.success) {
            Game.log.targetHistory.push(Game.log.currentTarget);
            Game.log.currentPoints += value.points;
            Game.log.totalPoints += value.points;
        }*/
    });


    $('#q2').html(TargetDB.targets[questList[1]].title);
    $('#q2').click(function() {
        getQuestDestinationByName(TargetDB.targets[questList[1]].name);
        app.currentTarget = [destination.coordinates.latitude, destination.coordinates.longitude];
    });
    $('#pq2').html(TargetDB.targets[questList[1]].descr);
    $('#qrs2').click(function() {
        QRCodeScanner.scan();
    });


    $('#q3').html(TargetDB.targets[questList[2]].title);
    $('#q3').click(function() {
        getQuestDestinationByName(TargetDB.targets[questList[2]].name);
        app.currentTarget = [destination.coordinates.latitude, destination.coordinates.longitude];
    });
    $('#pq3').html(TargetDB.targets[questList[2]].descr);
    $('#qrs3').click(function() {
        QRCodeScanner.scan();
    });


    $('#q4').html(TargetDB.targets[questList[3]].title);
    $('#q4').click(function() {
        getQuestDestinationByName(TargetDB.targets[questList[3]].name);
        app.currentTarget = [destination.coordinates.latitude, destination.coordinates.longitude];
    });
    $('#pq4').html(TargetDB.targets[questList[3]].descr);
    $('#qrs4').click(function() {
        QRCodeScanner.scan();
    });
}


function updatePoints(code) {
        var pid = QRCodeMapping[code];
        var value = Quest.finish(pid, Game.log.currentTarget);
        if(value.success) {
            Game.log.targetHistory.push(Game.log.currentTarget);
            Game.log.currentPoints += value.points;
            Game.log.totalPoints += value.points;
        }
}
