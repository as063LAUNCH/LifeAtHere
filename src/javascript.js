//import 'bootstrap/dist/css/bootstrap.min.css';

var LOGIN_URL = "https://myapi.bucknell.edu/framework/auth/signin/";
const NUM_EVENTS = 10;

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

function updateEventButtonData(events) {
  for (var i = 0; i < events.length; i += 1) {
    var html = events[i]["Title"] + ": " + events[i]["StartTime"] + " - " + events[i]["EndTime"];
    document.getElementById("event" + i.toString()).innerHTML = html;
    $('#event' + i.toString()).data("idNum", events[i]["Id"]);
  }
}

function renderEventButtonHtml() {
  html = `<h2>Popular Events for Fall 2017</h2>`
  for (var i = 0; i < NUM_EVENTS; i += 1) {
    html += `
    <div class="row">
      <button id="event` + i.toString() + `" data-idNum="` + i.toString() + `" class="link event-button" onClick="getEvent(this.id)" onmouseover="eventButtonHover(this.id)" onmouseleave="eventButtonLeave(this.id)"></button>
    </div>`
  }
  document.getElementById("event-button-container").innerHTML = html;
}

function loadMainPage() {
  renderEventButtonHtml();
  var events = getAllEvents();
  updateEventButtonData(events.slice(0, NUM_EVENTS));
}

function loadEventsSearch() {
  var events = getEvents();
  updateEventButtonData(events.slice(0, NUM_EVENTS));
}

function eventButtonHover(eventButtonId) {
  console.log("HOVERRRR");
  document.getElementById(eventButtonId).classList.add("hover");
}

function eventButtonLeave(eventButtonId) {
  document.getElementById(eventButtonId).classList.remove("hover");
}

function getEvent(eventButtonId) {
  var idString = $("#" + eventButtonId).data("idNum");
  window.location.href = "event.html?eventId=" + idString;
}

function getAllEvents() {
  var response = httpGetSynchronous("http://localhost:5000/eventsQuery/");
  return JSON.parse(response);
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
  return JSON.parse(response);
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
