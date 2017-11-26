import socket
import requests
import json
from flask import Flask
from flask import request
from flask import jsonify

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


def filterEventsByTime(tempEvents, filterMonthStart, filterDateStart, filterYearStart, \
    filterMonthEnd, filterDateEnd, filterYearEnd ):
  """
  @tempEvents :
  @year : String
  @month : String
  @day : String

  Will return an events object with only the events whose time is on or past the variables indicated
  """
  filteredEvents = []
  for event in tempEvents:
    if eventYear >= filterYearStart and eventYear <= filterYearEnd:
      if eventMonth >= filterMonthStart and eventMonth <= filterMonthEnd:
        if eventDate >= filterDateStart and eventDate <= filterDateEnd:
          filteredEvents.append(event)
  return filteredEvents

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'
    
@app.route('/yo')
def yo():
  return 'asdasfhjadfjlsa'

@app.route('/eventsQuery/<tags>')
def queryEvents(tags):
  tagsArray = tags.split("&")
  filteredEvents = events
  #print(filteredEvents)
  #print(tagsArray)
  for tag in tagsArray :
    filteredEvents = filterEventsByTag(filteredEvents, tag)
  response = jsonify(filteredEvents)
  response.headers.add('Access-Control-Allow-Origin', '*')
  #print("SENDING RESPONSE")
  #print(response)
  return response;

@app.route('/eventsQueryByTime/<dates>')
def queryEventsByTime(dates):
  """
  Assumes Dates will be in the format of MonthStart-DateStart-YearStart-MonthEnd-DateEnd-YearEnd
  such as 3-1-2017-5-6-2018 , so any events from 3-1-2017 to 5-6-2018 inclusive
  """
  tagsArray = tags.split("-")
  monthStart = int(tagsArray[0])
  dateStart = int(tagsArray[1])
  yearStart = int(tagsArray[2])
  monthEnd = int(tagsArray[3])
  dateEnd = int(tagsArray[4])
  yearEnd = int(tagsArray[5])

  filteredEvents = events
  #print(filteredEvents)
  #print(tagsArray)
  for tag in tagsArray :
    filteredEvents = filterEventsByTime(filteredEvents, monthStart, dateStart, yearStart \
      , monthEnd, dateEnd, yearEnd)

  response = jsonify(filteredEvents)
  response.headers.add('Access-Control-Allow-Origin', '*')
  print("SENDING RESPONSE")
  print(response)
  return response;


if __name__ == '__main__':
    app.run()
