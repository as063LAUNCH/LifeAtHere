//import 'bootstrap/dist/css/bootstrap.min.css';

var LOGIN_URL = "https://myapi.bucknell.edu/framework/auth/signin/";
var currentEvents = [];

function logIn() {
  //have javascript to log in now
  console.log("Sending request for login");
  var response = httpGetSynchronous(LOGIN_URL);
  console.log("Response received");
  console.log(response);
}

function getEvent(eventDescription) {
  var indexOfTime = eventDescription.lastIndexOf(": ");
  var title = eventDescription.substr(0, indexOfTime);
  var eventObj;
  for (var i = 0; i < currentEvents.length; i+=1) {
    if (currentEvents[i]["Title"] == title) {
      eventObj = currentEvents[i];
      break;
    }
  }
  window.location.href = "event.html?eventId=" + eventObj["Id"];
}

function getEvents() {
  console.log("getEvents");

  var select = document.getElementById("tag_filter");
  var tag = select.options[select.value].text;
  if (tag == "All Categories") {
    tag = "";
  }

  requestString = httpGetSynchronous("http://localhost:5000/eventsQuery/" + tag + "&" + "3-1-2017-5-6-2018");
  var responseObj = JSON.parse(requestString);
  currentEvents = responseObj;
  
  console.log(currentEvents);
  
  var html1 = responseObj[0]["Title"] + ": " + responseObj[0]["StartTime"] + " - " + responseObj[0]["EndTime"];
  var html2 = responseObj[1]["Title"] + ": " + responseObj[1]["StartTime"] + " - " + responseObj[0]["EndTime"];
  var html3 = responseObj[2]["Title"] + ": " + responseObj[2]["StartTime"] + " - " + responseObj[0]["EndTime"];
  document.getElementById("event1").innerHTML = html1;
  document.getElementById("event2").innerHTML = html2;
  document.getElementById("event3").innerHTML = html3;
  //httpGetAsynchronous("http://localhost:5000/eventsQuery/" + requestEnd);
};




function getEventsCallback(responseObj) {
  console.log("Response received, CALLBACK");
  //console.log(responseObj);
  console.log(typeof(responseObj));
  console.log(typeof(responseObj[0]));
  
  if (responseObj.length >= 3) {
    console.log(responseObj[0]['Title']);
    console.log(responseObj[1]['Title']);
    console.log(responseObj[2]['Title']);
  }
};

function handleFilterChange() {
  var select = document.getElementById("tag_filter");
  var tag = select.options[select.value].text;
  document.getElementById("filter-display").placeholder = tag;
}

function httpGetAsynchronous(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    console.log(xmlHttp.readyState);
    console.log(xmlHttp.status);
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      getEventsCallback(xmlHttp.responseText);
    }
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous request
  xmlHttp.send(null);
  console.log("Sending request for getEvents:");
  console.log(xmlHttp);
};

function httpGetSynchronous(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
