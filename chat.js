function renderChat(response){
    var chat = "";
    for(var data of JSON.parse(response).reverse()){
        chat = chat + data.message + "</br>";
    }
    document.getElementById("chat").innerHTML = chat;
}

function loadChat(){
    ajaxGetRequest("/chat", renderChat);
}

function sendMessage(){
    var nameElement = document.getElementById("name");
    var messageElement = document.getElementById("message");
    
    var name = nameElement.value;
    var message = messageElement.value;
    nameElement.value = "";
    messageElement.value = "";
    var toSend = JSON.stringify({"name": name,"message": message});
    
    ajaxPostRequest("/send", toSend, renderChat);
}

function ajaxGetRequest(path, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    };
    request.open("GET", path);
    request.send();
}

function ajaxPostRequest(path, data, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    };
    request.open("POST", path);
    request.send(data);
}

function action_on_response(response){
    console.log("The server responded with: " + response);
}

function called_on_button_press(){
    ajaxPostRequest("/some_path", "Button pressed", action_on_response);
}


function checkEnter(keyUpEvent){
    if(keyUpEvent.keyCode === 13){
        sendMessage();
    }
}