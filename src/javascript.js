var EVENTS_URL = "https://myapi.bucknell.edu/framework/data/communication/event/";

function logIn() {
	//have javascript to log in now
  console.log("Sending request");
	var response = httpGet("http://localhost:8888");
  console.log("Response received");
	console.log(response);
}

function GetEvents() {
	//have javascript to log in now
  console.log("GetEvents");
	var response = httpGet("http://localhost:8888");
  console.log("Response received");
	console.log(response);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var text = prompt("Filter your events");



