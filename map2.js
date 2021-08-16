function getPieParams(json_string){
    var dict = JSON.parse(json_string)
    var pieInfo = {}
    pieInfo["values"] = Object.values(dict)
    pieInfo["labels"] = Object.keys(dict)
    pieInfo["type"] = "pie"
    var arr = [pieInfo]
    return arr
}

function loadPieChart(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var pieParams = getPieParams(this.response);
            Plotly.newPlot('pie', pieParams, {
                height: 400,
                width: 500
            });
        }
    };
    xhttp.open("GET", "/borough");
    xhttp.send(); 
}

//BAR----------------------------------------------------------------------------------
function getBarParams(json_string){
    var dict = JSON.parse(json_string)
    var barInfo = {}
    barInfo["y"] = Object.values(dict)
    barInfo["x"] = Object.keys(dict)
    barInfo["type"] = "bar"
    var arr = [barInfo]
    return arr
}

function loadBarChart(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var barParams = getBarParams(this.response);
            Plotly.newPlot('bar', barParams);
        }
    };
    xhttp.open("GET", "/nta");
    xhttp.send(); 
}

//MAP----------------------------------------------------------------------------------

function setupMapData(array){
    var lat1 = []
    var lon1 = []
    var text1 = []
    for (var i = 0; i < array.length; i++){
        lat1.push(array[i][0])
        lon1.push(array[i][1])
        text1.push(array[i][2])   
    }
    var data = [{
        type:"scattermapbox",
        mode:"markers",
        marker: {
            size:10, color:"rgb(0,255,0)"
        },
        lat: lat1,
        lon: lon1,
        text: text1
    }]
    return data
}


function findCenter(array){
    var latList = []
    var lonList = []
    var centerArr = []
    for (var i = 0; i < array.length; i++){
        latList.push(array[i][0])
        lonList.push(array[i][1])
    }
    var x = Math.max(...latList) + Math.min(...latList)
    var y = Math.max(...lonList) + Math.min(...lonList)
    var latAvg = x / 2
    var lonAvg = y / 2
    centerArr.push(latAvg)
    centerArr.push(lonAvg)
    return centerArr
}

function setupMapLayout(array){
    var centerCords = findCenter(array)
    var lat1 = centerCords[0]
    var lon1 = centerCords[1]
    var layout = {
        mapbox: {
            style:"dark",
            zoom:10,
            center: {
                lat: lat1,
                lon: lon1
            }
        }
    }
    return layout
}
   
function getMapParams(json_string){
    var arr = JSON.parse(json_string)
    var x = setupMapData(arr)
    var y = setupMapLayout(arr)
    var mapInfo = {}
    mapInfo["data"] = x
    mapInfo["layout"] = y
    return mapInfo
}

function loadMap(){
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoibGltYm96IiwiYSI6ImNqcDdjd3l2eDBzZnQzcHFzM3VwZmU5ZWYifQ.KUkumtaV8Aum2whxIfp_Kw'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/firehouses");
    xhttp.send(); 
}