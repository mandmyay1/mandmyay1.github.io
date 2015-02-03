var myHeading = document.querySelector("h1");
myHeading.innerHTML = "Hello World!";

var myImage = document.querySelector('img');
myImage.onclick = function() {
	var mySrc = myImage.getAttribute('src');
	if(mySrc === 'images/310073_280x140.jpg'){
		myImage.setAttribute('src', 'images/ferrari-f430-price-20.jpg');
	}
	else{
		myImage.setAttribute('src', 'images/310073_280x140.jpg')
	}
}

var myButton = document.querySelector("button");
var myHeading = document.querySelector("h1");

function setUserName() {
	var myName = prompt("Please enter your name.");
	localStorage.setItem("name", myName);
	myHeading.innerHTML = "Ferrari F430, " + myName;
}

if( !localStorage.getItem("name")){
	setUserName();
}
else {
	var storedName = localStorage.getItem("name");
	myHeading.innerHTML = 'Ferrari F430, ' + storedName;
}

myButton.onclick = setUserName;