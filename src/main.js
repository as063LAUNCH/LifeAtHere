var EVENTS_URL = "https://myapi.bucknell.edu/framework/data/communication/event/";

function logIn() {
	//have javascript to log in now
	var response = httpGet(EVENTS_URL);
	console.log(response);
	console.log("Logging In");
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
