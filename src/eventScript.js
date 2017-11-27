function loadEventInfo() {
  var idString = decodeURIComponent(window.location.search);
  idString = idString.substring("?eventId=".length);
  var response = httpGetSynchronous("http://localhost:5000/eventQueryById/" + idString);
  var eventObj = JSON.parse(response);
  document.getElementById("event_title").innerHTML = eventObj["Title"];
  console.log(eventObj);
}

function httpGetSynchronous(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}