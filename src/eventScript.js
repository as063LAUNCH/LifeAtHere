var defaultImageUrl = "http://assets.time.com/mcp/2017/profile/211291.jpg";

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

function loadEventInfo() {
  var idString = decodeURIComponent(window.location.search);
  idString = idString.substring("?eventId=".length);
  var response = httpGetSynchronous("http://localhost:5000/eventQueryById/" + idString);
  var eventObj = JSON.parse(response);
  var date = new Date(eventObj["EventDate"]);
  var dateString = getDateString(date.getUTCDay(), date.getDay(), date.getMonth(), date.getFullYear());
  var imageUrl = getImageUrl(eventObj["Locations"][0]["Location"]);

  document.getElementById("event_image").src = imageUrl;
  document.getElementById("event_title").innerHTML = eventObj["Title"];
  document.getElementById("date").innerHTML = dateString;
  document.getElementById("time_start_end").innerHTML = eventObj["StartTime"] + " - " + eventObj["EndTime"];
  document.getElementById("location").innerHTML = eventObj["Locations"][0]["Location"];
  document.getElementById("location").href = eventObj["Locations"][0]["Link"];
  return true;
}

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
    case 1:
      dateString += "January";
      break;
    case 2:
      dateString += "February";
      break;
    case 3:
      dateString += "March";
      break;
    case 4:
      dateString += "April";
      break;
    case 5:
      dateString += "May";
      break;
    case 6:
      dateString += "June";
      break;
    case 7:
      dateString += "July";
      break;
    case 8:
      dateString += "August";
      break;
    case 9:
      dateString += "September";
      break;
    case 10:
      dateString += "October";
      break;
    case 11:
      dateString += "November";
      break;
    case 12:
      dateString += "December";
      break;
    default:
      dateString += "Invalid month";
      break;
  }
  dateString += " " + day.toString() + " " + year.toString();
  return dateString;
}

function getImageUrl(location) {
  location = location.toLowerCase();
  if (location.contains("elaine langone center")) {
    return "resources/images/elaine_langone_center.jpg"
  } else if (location.contains("dana engineering")) {
    return "resources/images/dana_engineering.jpg"
  } else if (location.contains("swartz hall")) {
    return "resources/images/swartz_hall.jpg"
  } else if (location.contains("roberts hall")) {
    return "resources/images/roberts_hall.jpg"
  } else if (location.contains("tennis courts")) {
    return "resources/images/tennis_courts.jpg"
  } else if (location.contains("graham field")) {
    return "resources/images/graham_field.jpg"
  } else if (location.contains("athletic fields")) {
    return "resources/images/athletic_fields.jpg"
  } else if (location.contains("academic west")) {
    return "resources/images/academic_west.jpg"
  } else if (location.contains("mcdonnell hall")) {
    return "resources/images/mcdonnell_hall.jpg"
  } else if (location.contains("coleman hall")) {
    return "resources/images/coleman_hall.jpg"
  } else if (location.contains("arts building")) {
    return "resources/images/arts_building.jpg"
  } else if (location.contains("gerhard fieldhouse") || location.contains("kenneth langone athletics")) {
    return "resources/images/klarc.jpg"
  } else if (location.contains("weis center")) {
    return "resources/images/weis_center.jpg"
  } else if (location.contains("sigfried weis")) {
    return "resources/images/sigfried_weis.jpg"
  } else if (location.contains("rooke chapel")) {
    return "resources/images/rooke_chapel.jpg"
  } else if (location.contains("rooke") || location.contains("biology building")) {
    return "resources/images/rooke_chem.jpg"
  } else if (location.contains("breakiron")) {
    return "resources/images/breakiron.jpg"
  } else if (location.contains("galloway house")) {
    return "resources/images/galloway_house.jpg"
  } else if (location.contains("bucknell golf club")) {
    return "resources/images/bucknell_golf_club.jpg"
  } else if (location.contains("bucknell hall")) {
    return "resources/images/bucknell_hall.jpg"
  } else if (location.contains("vaughn literature")) {
    return "resources/images/vaughn_lit.jpg"
  } else if (location.contains("smith hall")) {
    return "resources/images/smith_hall.jpg"
  } else if (location.contains("campus theatre")) {
    return "resources/images/campus_theatre.jpg"
  } else if (location.contains("taylor hall")) {
    return "resources/images/taylor_hall.jpg"
  } else if (location.contains("sojka pavilion")) {
    return "resources/images/sojka.jpg"
  } else if (location.contains("the grove")) {
    return "resources/images/the_grove.jpg"
  } else if (location.contains("science quad")) {
    return "resources/images/quad.jpg"
  } else if (location.contains("7th st. cafe")) {
    return "resources/images/seventh_street_cafe.jpg"
  } else if (location.contains("graham building")) {
    return "resources/images/graham_building.jpg"
  } else if (location.contains("olin science")) {
    return "resources/images/olin_science.jpg"
  } else if (location.contains("barnes & noble")) {
    return "resources/images/barnes_and_noble.jpg"
  } else if (location.contains("bertrand library")) {
    return "resources/images/bertrand_library.jpg"
  } else if (location.contains("berelson center")) {
    return "resources/images/berelson_center.jpg"
  } else if (location.contains("o'leary center")) {
    return "resources/images/oleary_center.jpg"
  } else if (location.contains("larison hall")) {
    return "resources/images/larison_hall.jpg"
  } else if (location.contains("christy mathewson")) {
    return "resources/images/christy_mathewson.jpg"
  } else if (location.contains("environmental center")) {
    return "resources/images/environmental_center.jpg"
  } else if (location.contains("kinney natatorium")) {
    return "resources/images/kinney_natatorium.jpg"
  } else if (location.contains("art barn")) {
    return "resources/images/art_barn.jpg"
  } else if (location.contains("freas hall")) {
    return "resources/images/freas_hall.jpg"
  } /* COULDNT FIND A PICTURE else if (location.contains("corner house")) {
    return "images/corner_house.jpg"
  } */else if (location.contains("president's house")) {
    return "resources/images/presidents_house.jpg"
  } else if (location.contains("hunt hall")) {
    return "resources/images/hunt_hall.jpg"
  } else if (location.contains("carnegie building")) {
    return "resources/images/carnegie_building.jpg"
  } else if (location.contains("dewitt building")) {
    return "resources/images/dewitt_building.jpg"
  } else if (location.contains("observatory")) {
    return "resources/images/observatory.jpg"
  } else if (location.contains("davis gym")) {
    return "resources/images/davis_gym.jpg"
  } else {
    return "resources/images/default.jpg"
  }
}

function httpGetSynchronous(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
