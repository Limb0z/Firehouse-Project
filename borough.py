import urllib.request
import json


def get_borough_data(stringURL):
    url = stringURL
    response = urllib.request.urlopen(url)
    content = response.read().decode()
    arr = json.loads(content)
    returnArr = []
    for dict in arr:
        if "borough" in dict.keys():
            returnArr.append(dict["borough"])
    return returnArr
    

def sort_by_borough(arr):
    dict = {
        "Manhattan": 0,
        "Brooklyn": 0,
        "Queens": 0,
        "Bronx": 0,
        "Staten Island": 0
    }
    for borough in arr:
        dict[borough] = dict[borough] + 1
    return json.dumps(dict)
    
#NTA--------------------------------------------------------------------------

def get_nta_data(stringURL):
    url = stringURL
    response = urllib.request.urlopen(url)
    content = response.read().decode()
    arr = json.loads(content)
    returnArr = []
    for dict in arr:
        if "nta" in dict.keys():
            returnArr.append(dict["nta"])
    return returnArr
    

def sort_by_nta(arr):
    dict = {}
    for nta in arr:
        if nta in dict:
            dict[nta] = dict[nta] + 1
        else:
            dict[nta] = 1
    return json.dumps(dict)