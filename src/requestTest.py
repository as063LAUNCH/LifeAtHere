import socket
import requests
import json

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
'''
userResponse = ""

audience = set()
for event in events :
  keys = event[AUDIENCE]['Tags']
  for key in keys:
    if key not in audience:
      audience.add(key)
print(audience)

def filterEventsByTag(filter) :
  filteredEvents = []
  for event in events :
    if (filter.lower() in map(lambda x : x.lower(), event[AUDIENCE]['Tags'])) :
      filteredEvents.append(event[TITLE])
  return filteredEvents

while (userResponse != "q") :
  userResponse = input("Type a string to filter events by: ")
  filtered = filterEventsByTag(userResponse)
  print(filtered)
  '''
  

HOST, PORT = '', 8888
listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
listen_socket.bind((HOST, PORT))
listen_socket.listen(1)
print ('Serving HTTP on port %s ...' % PORT)
while True:
    client_connection, client_address = listen_socket.accept()
    request = client_connection.recv(1024)
    print(request)
    http_response = "HTTP/1.0 200 OK\r\n"
    http_response += "Access-Control-Allow-Origin: *\r\n"
    #http_response += "Content-Type: text/plain"
    http_response += "Content-Type: application.json\r\n\r\n"
    http_response += json.dumps(events[0])
    
    client_connection.sendall(http_response.encode('utf-8'))
    client_connection.close()
