import socket
import requests
import json
from flask import Flask
from flask import request
from flask import jsonify
from datetime import date

ID = 'Id' # String
TITLE = 'Title' # String
TYPE = 'Type' # String
EVENT_DATE = 'EventDate' # String
ALL_DAY_EVENT = 'AllDayEvent' # Boolean
LOCATIONS = 'Locations' # List of Locations -> {'Location', 'Link'}
END_TIME = 'Endtime' # String
START_TIME = 'StartTime' # String
UPDATE_TIME = 'UpdateTime' # String
LOCATION_URL = 'LocationUrl' # ?
LINK = 'Link' # String
ACTIVE = 'Active' # Boolean
AUTHOR = 'Author' # String (?)
BODY = 'Body' # String
CREATION_TIME = 'CreationTime' # String
AUDIENCE = 'Audience' # Dict -> {'Groups' (LIST), 'People' (LIST), 'Permissions' (LIST), 'Tags' (LIST)}

'''
These are the possible tags that we can filter by:

'Academic'
'Recreation'
'Event'
'Family'
'Staff'
'Sports'
'Student Clubs and Organizations'
'Religious'
'Arts & Performance'
'''

PERIOD = 'Period' # Dict -> {'StartTime' (TIMESTAMP), 'EndTime' (TIMESTAMP)}
STATUS = 'Status' # String
IMPORTED = 'Imported' # Boolean
REFERENCE_IMAGE_URL = 'ReferenceImageUrl' # ?
INCLUDE_GEO_POINTS = 'IncludeGeoPoints' # Boolean
GEO_POINTS = 'GeoPoints' # ?

EVENTS_URL = "https://myapi.bucknell.edu/framework/data/communication/event/?access_token=70c746e5-0a28-4c56-a4b7-84ade9d05940"

response = requests.get(EVENTS_URL)
events = response.json()

def filterEventsByTag(tempEvents, filter) :
  filteredEvents = []
  for event in tempEvents :
    if (filter.lower() in map(lambda x : x.lower(), event[AUDIENCE]['Tags'])) :
      filteredEvents.append(event)
  return filteredEvents


def filterEventsByTime(tempEvents, dateStart, dateEnd):
  """
  @tempEvents : list of event
  @dateStart : date object that is the starting range
  @dateEnd : date object that is the ending range

  Will return an events object with only the events whose time is on or past dates indicated
  """
  filteredEvents = []
  for event in tempEvents:
    meta = event["EventDate"][0:10].split("-") #getting date information
    eventDate = date(int(meta[0]), int(meta[1]), int(meta[2])) #creating date object to use
    if(eventDate >= dateStart and eventDate <= dateEnd):
      print(event)
      filteredEvents.append(event)

  return filteredEvents

def getEventById(eventId):
  for event in events :
    if event[ID] == eventId :
      return event
  return None;

app = Flask(__name__)

@app.route('/eventsQuery/')
def queryAllEvents():
  response = jsonify(events)
  response.headers.add('Access-Control-Allow-Origin', '*')
  #print("SENDING RESPONSE")
  #print(response)
  return response;



@app.route('/eventsQuery/<tag>')
def queryEvents(tag):

  conditions = tag.split("&") #creates an array [filterCategories, dates]
  tagCatgeories = conditions[0]

  filteredEvents = events

  if (tagCatgeories != ""):
    filteredEvents = filterEventsByTag(filteredEvents, tagCatgeories)


  dateArray = conditions[1].split("-")
  monthStart = int(dateArray[0])
  dateStart = int(dateArray[1])
  yearStart = int(dateArray[2])
  startDate = date(yearStart, monthStart, dateStart) #Create the Starting Date object to filter by

  monthEnd = int(dateArray[3])
  dateEnd = int(dateArray[4])
  yearEnd = int(dateArray[5])
  endDate = date(yearEnd, monthEnd, dateEnd) #Create the Ending Date object to filter by

  filteredEvents = filterEventsByTime(filteredEvents, startDate, endDate)



  response = jsonify(filteredEvents)
  response.headers.add('Access-Control-Allow-Origin', '*')
  #print("SENDING RESPONSE")
  #print(response)
  return response;


if __name__ == '__main__':
    app.run()
