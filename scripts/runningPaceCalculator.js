/**
 * 
 */

function pad(num, size) {
    var s = "000000" + num;
    return s.substr(s.length-size);
}
function validate(context){
	var parentDiv = context.parentElement.parentElement;
	var divId = parentDiv.id;
	var dist = document.getElementById("distance" + divId).value;
	var time = document.getElementById("time" + divId).value;
	var result = document.getElementById("result" + divId);
	var distanceDropdown = document.getElementById("distance_dropdown" + divId).value;
	var timeDropdown = document.getElementsByName("time_dropdown" + divId);
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

// Duplicate a div with a new ID, including all contents
function copyDiv(context) {
	var parentDiv = context.parentElement;
	var body = parentDiv.parentElement;
	var ownerDocument = parentDiv.ownerDocument;
	var copyDiv = ownerDocument.createElement("div");
	var id = parentDiv.id;
	var newId = parseInt(id) + 1;
	while (document.getElementById(newId) !== null) {
		newId ++;
	}
	var html = parentDiv.innerHTML;
	body.appendChild(copyDiv);
	copyDiv.innerHTML = replaceHtml(html, id, newId);
	copyDiv.id = newId;
	copyFields(id, newId);
}

// Copy the selected values into the new fields
function copyFields(id, newId) {
	var oldDist = document.getElementById("distance" + id).value;
	var oldTime = document.getElementById("time" + id).value;
	var oldDistanceDropdown = document.getElementById("distance_dropdown" + id).value;
	var oldTimeRadio1 = document.getElementById("hh.mm.ss" + id);
	var oldTimeRadio2 = document.getElementById("ss.ms" + id);
	document.getElementById("distance" + newId).value = oldDist;
	document.getElementById("time" + newId).value = oldTime;
	document.getElementById("distance_dropdown" + newId).value = oldDistanceDropdown;
	document.getElementById("hh.mm.ss" + newId).checked = oldTimeRadio1.checked;
	document.getElementById("ss.ms" + newId).checked = oldTimeRadio2.checked;

}

// Replace old ID with new ID in a given html
function replaceHtml(inputHtml, id, newId){
	inputHtml = inputHtml.replace("distance" + id, "distance" + newId);
	inputHtml = inputHtml.replace("time" + id, "time" + newId);
	inputHtml = inputHtml.replace("distance_dropdown" + id, "distance_dropdown" + newId);
	inputHtml = inputHtml.replace(new RegExp("time_dropdown" + id,  "g"), "time_dropdown" + newId);
	inputHtml = inputHtml.replace("time_dropdown" + id, "time_dropdown" + newId);
	inputHtml = inputHtml.replace(new RegExp("hh.mm.ss" + id, "g"), "hh.mm.ss" + newId);
	inputHtml = inputHtml.replace(new RegExp("ss.ms" + id, "g"), "ss.ms" + newId);
	inputHtml = inputHtml.replace("result" + id, "result" + newId);
	inputHtml = inputHtml.replace("copy" + id, "copy" + newId);
	return inputHtml;
}