function loadEventInfo() {
  var idString = decodeURIComponent(window.location.search);
  idString = idString.substring("?eventId=".length);
  var response = httpGetSynchronous("http://localhost:5000/eventQueryById/" + idString);
  var eventObj = JSON.parse(response);
  console.log(eventObj["ReferenceImageUrl"]);
  document.getElementById("event_title").innerHTML = eventObj["Title"];
  document.getElementById("location").innerHTML = eventObj["Locations"][0]["Location"];
  document.getElementById("location").href = eventObj["Locations"][0]["Link"];
  document.getElementById("date_start").innerHTML = "Start: " + eventObj["StartTime"];
  document.getElementById("date_end").innerHTML = "End: " + eventObj["EndTime"];
  return true;
}

function httpGetSynchronous(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
