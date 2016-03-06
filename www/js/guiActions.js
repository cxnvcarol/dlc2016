/**
 * Created by Diana on 05-Mar-16.
 */

//Get time left to catch connection
var shouldStopPlaying = false;

function startCountdown() {
    window.location='#pass-time-left';
    var flightId = document.getElementById('con-info').value;
    var typeId = document.getElementById('flip-min').value;

    if(flightId)
    {
        flightId=flightId.trim();
    }

    if(typeId =="flight"){
        var time = getTimeTillNextFlight(flightId);
    }

    if(typeId =="train"){
        // function from DBBAhN var time = getTimeTillNextFlight(flightId);
    }


    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time / 60) % 60);
    var seconds = Math.floor(time % 60);

    var tleft = hours + ":" + minutes + ":" + seconds;
    console.log(tleft);

    $('#time-left').html(tleft);


    setInterval(function(){
        time=time-1;
        if (time <= 3600)   ///// TODO compute traveltime distance from you to the gate and perhaps even the delay through customs/security
            shouldStopPlaying = true;
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time / 60) % 60);
        var seconds = Math.floor(time % 60);
        var tleft = hours + ":" + minutes + ":" + seconds;

        $('.ui-counter').html(tleft);

    },1000);

}


function populateQuests() {
    var questList = Quest.acquire(0, {lati: app.currentPosition[0], long: app.currentPosition[1]}).slice(0, 4);
    $('#q1').html(TargetDB.targets[questList[0]].title);
    $('#q1').click(function() {
        getQuestDestinationByName(TargetDB.targets[questList[0]].name);
        app.currentTarget = [destination.coordinates.latitude, destination.coordinates.longitude];
    });
    $('pq1').html(TargetDB.targets[questList[0]].descr);


    $('#q2').html(TargetDB.targets[questList[1]].title);
    $('#q2').click(function() {
        getQuestDestinationByName(TargetDB.targets[questList[1]].name);
        app.currentTarget = [destination.coordinates.latitude, destination.coordinates.longitude];
    });
    $('#pq2').html(TargetDB.targets[questList[1]].descr);


    $('#q3').html(TargetDB.targets[questList[2]].title);
    $('#q3').click(function() {
        getQuestDestinationByName(TargetDB.targets[questList[2]].name);
        app.currentTarget = [destination.coordinates.latitude, destination.coordinates.longitude];
    });
    $('#pq3').html(TargetDB.targets[questList[2]].descr);


    $('#q4').html(TargetDB.targets[questList[3]].title);
    $('#q4').click(function() {
        getQuestDestinationByName(TargetDB.targets[questList[3]].name);
        app.currentTarget = [destination.coordinates.latitude, destination.coordinates.longitude];
    });
    $('#pq4').html(TargetDB.targets[questList[3]].descr);
}