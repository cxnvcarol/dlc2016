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
