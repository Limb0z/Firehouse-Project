import urllib.request
import json


def get_firehouse_data(stringURL):
    url = stringURL
    response = urllib.request.urlopen(url)
    content = response.read().decode()
    arr = json.loads(content)
    returnArr = []
    for dict in arr:
        if "latitude" in dict.keys() and "longitude" in dict.keys():
            returnArr.append([float(dict["latitude"]), float(dict["longitude"]), dict["facilityname"]])
    return json.dumps(returnArr)