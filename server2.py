import bottle
import borough
import firehouses
import chat
import json


@bottle.route("/")
def index():
    return bottle.static_file("index2.html", root="")


@bottle.route("/map2.js")
def map():
    return bottle.static_file("map2.js", root="")


@bottle.route('/borough')
def get_borough():
    return borough.sort_by_borough(borough.get_borough_data("https://data.cityofnewyork.us/resource/byk8-bdfw.json"))


@bottle.route('/nta')
def get_nta():
    return borough.sort_by_nta(borough.get_nta_data("https://data.cityofnewyork.us/resource/byk8-bdfw.json"))    


@bottle.route("/firehouses")
def get_firehouses():
    return firehouses.get_firehouse_data("https://data.cityofnewyork.us/resource/byk8-bdfw.json")


@bottle.route('/chat.js')
def static():
    return bottle.static_file("chat.js", root="")


@bottle.route('/chat')
def get_chat():
    return json.dumps(chat.get_chat())


@bottle.post('/send')
def do_chat():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    chat.add_message(content['name'], content['message'])
    return json.dumps(chat.get_chat())


bottle.run(host="0.0.0.0", port=8080, debug=True)