import requests
BUILDING_URL = "https://myapi.bucknell.edu/framework/data/building/summary/?access_token=70c746e5-0a28-4c56-a4b7-84ade9d05940"
response = requests.get(BUILDING_URL)
buildings = response.json()
EVENTS_URL = "https://myapi.bucknell.edu/framework/data/communication/event/?access_token=70c746e5-0a28-4c56-a4b7-84ade9d05940"

response = requests.get(EVENTS_URL)
events = response.json()
#locs = set()
def findLocation(event):
    location = (0.0,0.0)
    loc = event['Locations'][0]['Location']
    for build in buildings:
        if(build['Name'] in loc):
            location = (build['Latitude'],build['Longitude'])
    '''if location == (0.0,0.0):
        locs.add(loc)
    '''
    event['Latitude'] = location[0]
    event['Longitude'] = location[1]
    return event

for event in events:
    findLocation(event)
'''for loc in locs:
    print(loc)'''
