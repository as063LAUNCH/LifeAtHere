//import 'bootstrap/dist/css/bootstrap.min.css';

var LOGIN_URL = "https://myapi.bucknell.edu/framework/auth/signin/";
var currentEvents = {};
function mapCurrentEvents(eventObj) {
  return [eventObj]
}

function logIn() {
  //have javascript to log in now
  console.log("Sending request for login");
  var response = httpGetSynchronous(LOGIN_URL);
  console.log("Response received");
  console.log(response);
}

function loadMainPage() {
  var events = getAllEvents();
  var html1 = events[0]["Title"] + ": " + events[0]["StartTime"] + " - " + events[0]["EndTime"];
  var html2 = events[1]["Title"] + ": " + events[1]["StartTime"] + " - " + events[0]["EndTime"];
  var html3 = events[2]["Title"] + ": " + events[2]["StartTime"] + " - " + events[0]["EndTime"];
  console.log(events[0]["Id"]);
  console.log(events[1]["Id"]);
  console.log(events[2]["Id"]);
  document.getElementById("event1").innerHTML = html1;
  $("#event1").data("idNum", events[0]["Id"]);
  document.getElementById("event2").innerHTML = html2;
  $("#event2").data("idNum", events[1]["Id"]);
  document.getElementById("event3").innerHTML = html3;
  $("#event3").data("idNum", events[2]["Id"]);
}

function getEvent(eventButtonId) {
  var idString = $("#" + eventButtonId).data("idNum");
  window.location.href = "event.html?eventId=" + idString;
}

function getAllEvents() {
  var response = httpGetSynchronous("http://localhost:5000/eventsQuery/");
  return currentEvents = JSON.parse(response);
}

function getEvents() {
  console.log("getEvents");

  var select = document.getElementById("tag_filter");
  var filters = select.options[select.value].text;
  if (filters == "All Categories") {
    filters = "";
  }
  filters += "|"; //used for backend split to qeurey on multiple conditions
  filters += "3-1-2017-5-6-2018";

  var response = httpGetSynchronous("http://localhost:5000/eventsQuery/" + filters);
  return currentEvents = JSON.parse(response);
  //httpGetAsynchronous("http://localhost:5000/eventsQuery/" + requestEnd);
};

function updateEvents() {
  var events = getEvents();
  var html1 = events[0]["Title"] + ": " + events[0]["StartTime"] + " - " + events[0]["EndTime"];
  var html2 = events[1]["Title"] + ": " + events[1]["StartTime"] + " - " + events[0]["EndTime"];
  var html3 = events[2]["Title"] + ": " + events[2]["StartTime"] + " - " + events[0]["EndTime"];
  document.getElementById("event1").innerHTML = html1;
  document.getElementById("event2").innerHTML = html2;
  document.getElementById("event3").innerHTML = html3;
}

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
