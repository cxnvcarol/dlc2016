/**
 * Created by Diana on 05-Mar-16.
 */

//Get time left to catch connection
var shouldStopPlaying = false;

function startCountdown() {
    window.location='#pass-time-left';
    var flightId = document.getElementById('con-info').value;
    var time = getTimeTillNextFlight(flightId);

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

        $('#counter-label').html(tleft);

    },1000);

}

//
// function polledExecutioner(functionToBeCalledInAFixedInterval, fixedTimeIntervalInMilliSeconds) {

function updateCountdown(){
    var flightId = document.getElementById('con-info').value;
    var flightTime = getTimeTillNextFlight(flightId);

    $('#counter-label').html(polledExecutioner(updateCountdown, 1000));

}

//polledExecutioner(updateCountdown, 1000);