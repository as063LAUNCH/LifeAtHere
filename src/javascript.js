//import 'bootstrap/dist/css/bootstrap.min.css';

var LOGIN_URL = "https://myapi.bucknell.edu/framework/auth/signin/";

function logIn() {
  //have javascript to log in now
  console.log("Sending request for login");
  var response = httpGetSynchronous(LOGIN_URL);
  console.log("Response received");
  console.log(response);
}

function getEvents() {
  console.log("getEvents");
  var tag = document.getElementById("eventsFilter");
  //var tags = ['academic'];
  var requestEnd = tags.join("&");
  
  var response = httpGetSynchronous("http://localhost:5000/eventsQuery/" + requestEnd);
  var responseObj = JSON.parse(response);
  var html1 = responseObj[0]["Title"] + ": " + responseObj[0]["StartTime"] + " - " + responseObj[0]["EndTime"]
  var html2 = responseObj[1]["Title"] + ": " + responseObj[1]["StartTime"] + " - " + responseObj[0]["EndTime"]
  var html3 = responseObj[2]["Title"] + ": " + responseObj[2]["StartTime"] + " - " + responseObj[0]["EndTime"]
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
