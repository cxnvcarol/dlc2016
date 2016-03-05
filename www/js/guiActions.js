/**
 * Created by Diana on 05-Mar-16.
 */

//Get time left to catch connection
$('#con-submit').click(function() {
    var flightId = document.getElementById('con-info').value;
    var time = getTimeTillNextFlight(flightId);

    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time / 60) % 60);
    var seconds = Math.floor(time % 60);

    var tleft = hours + ":" + minutes + ":" + seconds;
    console.log(tleft);
    return $('#time-left').html(tleft);

});