function logIn() {
	//have javascript to log in now
  console.log("Sending request");
	var response = httpGet("http://localhost:8888");
  console.log("Response received");
	console.log(response);
}

function GetEvents() {
  console.log("GetEvents");
	var tags = ['family'];
	var requestEnd = tags.join("&");
	var response = httpGet("http://localhost:5000/eventsQuery/" + requestEnd);
  console.log("Response received");
	console.log(response);
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
