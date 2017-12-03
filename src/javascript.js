//import 'bootstrap/dist/css/bootstrap.min.css';

var LOGIN_URL = "https://myapi.bucknell.edu/framework/auth/signin/";
var END_DATE = "0/0/0";
const NUM_EVENTS = 10;
const sortFunction = function(event1, event2) {
  var date1 = new Date(event1["EventDate"]);
  var date2 = new Date(event2["EventDate"]);
  if (date1 > date2) {
    return -1;
  } else if (date1 < date2) {
    return 1;
  } else {
    return 0;
  }
};

function mapCurrentEvents(eventObj) {
  return [eventObj];
}

function logIn() {
  //have javascript to log in now
  console.log("Sending request for login");
  var response = httpGetSynchronous(LOGIN_URL);
  console.log("Response received");
  console.log(response);
}

function updateEventButtonData(events) {
  if (events.length == 0) {
    document.getElementById("no_events_text").classList.remove("hidden");
  } else {
    if (!document.getElementById("no_events_text").classList.contains("hidden")) {
      document.getElementById("no_events_text").classList.add("hidden");
    }
  }
  for (var i = 0; i < events.length; i += 1) {
    var date = new Date(events[i]["EventDate"]);
    var html = events[i]["Title"] + ": " + getDateString(date.getDay(), date.getDate(), date.getMonth(), date.getFullYear()) + "; " + events[i]["StartTime"] + " - " + events[i]["EndTime"];
    document.getElementById("event" + i.toString()).innerHTML = html;
    document.getElementById("event" + i.toString()).classList.remove("hidden");
    $('#event' + i.toString()).data("idNum", events[i]["Id"]);
  }
  for (var i = events.length; i < NUM_EVENTS; i += 1) {
    document.getElementById("event" + i.toString()).classList.add("hidden");
  }
}

function renderEventButtonHtml(numEvents) {
  html = `<h2>Popular Events for Fall 2017</h2>`;
  html += `<h4 id="no_events_text" class="hidden" style="color:red">No events for your search :(</h2>`;
  for (var i = 0; i < NUM_EVENTS; i += 1) {
    if (i + 1 > numEvents) {
      html += `
      <div class="row">
        <button id="event` + i.toString() + `" data-idNum="` + i.toString() + `" class="event-button hidden" onClick="getEvent(this.id)" onmouseover="eventButtonHover(this.id)" onmouseleave="eventButtonLeave(this.id)"></button>
      </div>`;
    } else {
      html += `
      <div class="row">
        <button id="event` + i.toString() + `" data-idNum="` + i.toString() + `" class="event-button" onClick="getEvent(this.id)" onmouseover="eventButtonHover(this.id)" onmouseleave="eventButtonLeave(this.id)"></button>
      </div>`;
    }
  }
  document.getElementById("event-button-container").innerHTML = html;
}

function loadMainPage() {
  var events = getAllEvents();
  renderEventButtonHtml(events.length);
  events.sort(sortFunction);
  updateEventButtonData(events.slice(0, Math.min(NUM_EVENTS, events.length)));
}

function loadEventsSearch() {
  var events = getEvents();
  events.sort(sortFunction);
  console.log(events);
  updateEventButtonData(events.slice(0, Math.min(NUM_EVENTS, events.length)));
}

function eventButtonHover(eventButtonId) {
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
  filters += "&"; //used for backend split to query on multiple conditions
  date = document.getElementById("datepicker").value; //if no ending date, it will just be x-x-x-none-none-none
  date += "/"; //used to seperate endDate aand startDate for backend parsing
  date += END_DATE;

  date = date.split("/").join("-");
  var response = httpGetSynchronous("http://localhost:5000/eventsQuery/" + filters + date);
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

function loadEventsForDate(){
  END_DATE = "0/0/0";
  loadEventsSearch();
}

$(document).ready(function() {
  $("#datepicker").datepicker();
});

function getDateString(dayOfWeek, day, month, year) {
  dateString = "";
  switch(dayOfWeek) {
    case 0:
      dateString = "Sunday";
      break;
    case 1:
      dateString = "Monday";
      break;
    case 2:
      dateString = "Tuesday";
      break;
    case 3:
      dateString = "Wednesday";
      break;
    case 4:
      dateString = "Thursday";
      break;
    case 5:
      dateString = "Friday";
      break;
    case 6:
      dateString = "Saturday";
      break;
    default:
      dateString = "INVALID DAY";
  }
  dateString += ", ";
  switch(month) {
    case 0:
      dateString += "January";
      break;
    case 1:
      dateString += "February";
      break;
    case 2:
      dateString += "March";
      break;
    case 3:
      dateString += "April";
      break;
    case 4:
      dateString += "May";
      break;
    case 5:
      dateString += "June";
      break;
    case 6:
      dateString += "July";
      break;
    case 7:
      dateString += "August";
      break;
    case 8:
      dateString += "September";
      break;
    case 9:
      dateString += "October";
      break;
    case 10:
      dateString += "November";
      break;
    case 11:
      dateString += "December";
      break;
    default:
      dateString += "Invalid month";
      break;
  }
  dateString += " " + day.toString() + " " + year.toString();
  return dateString;
}
