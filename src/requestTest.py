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
  print(tagsArray)
  for tag in tagsArray :
    filteredEvents = filterEventsByTag(filteredEvents, tag)
    print(filteredEvents)
  response = jsonify(filteredEvents)
  response.headers.add('Access-Control-Allow-Origin', '*')
  print("SENDING RESPONSE")
  return response;

if __name__ == '__main__':
    app.run()
