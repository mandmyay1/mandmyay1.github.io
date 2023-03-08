/**
 * 
 */

function pad(num, size) {
    var s = "000000" + num;
    return s.substr(s.length-size);
}
function validate(){
	var dist = document.getElementById("distance").value;
	var time = document.getElementById("time").value;
	var result = document.getElementById("result");
	var distanceDropdown = document.getElementById("distance_dropdown").value;
	var timeDropdown = document.getElementsByName("time_dropdown");
	var timeDropdownValue = '';
	for (var i = 0; i < timeDropdown.length; i++) {
		if (timeDropdown[i].checked) {
			timeDropdownValue = timeDropdown[i].value;
		}
	}
	result.innerHTML="";
	var hours = 0, minutes = 0, seconds = 0;
	var timeSplit = time.split(/[\.:]+/);
	if( !dist || timeSplit.length == 0 ){ return; }
	
	if (distanceDropdown == "meters") {
		dist = dist / 1609.34;
		distanceDropdown = "miles";
	}

	if (timeDropdownValue == "SS.MS") {
		seconds = parseFloat(time);
	}
	else {
		if( timeSplit.length == 1){
			seconds = parseInt(timeSplit[0]);
		}
		else if( timeSplit.length == 2 ){
			minutes = parseInt(timeSplit[0]);
			seconds = parseInt(timeSplit[1]);
		}
		else if( timeSplit.length == 3 ){
			hours = parseInt(timeSplit[0]);
			minutes = parseInt(timeSplit[1]);
			seconds = parseInt(timeSplit[2]);
		}
	}
	if( !seconds ){ seconds = 0; }
	if( !minutes ){ minutes = 0; }
	if( !hours ){ hours = 0;}
	var totalMinutes = 60*hours + minutes + seconds/60;
	var minutePace = Math.floor( totalMinutes / dist );
	var secPace = Math.floor((( totalMinutes / dist ) - minutePace) *60);
	result.innerHTML = minutePace + ":" + pad(secPace, 2) + " minutes per " + distanceDropdown;
	
}