var socket = io();
var counter = document.getElementById("count");
var title = document.getElementById("title-counter");



document.body.onkeyup = function(e){
    if(e.keyCode == 32){
    	e.preventDefault();
        socket.emit("increaseCount");
        
        var personalCounter = document.getElementById("p-count");
        personalCounter.innerHTML = parseInt(personalCounter.innerHTML) + 1;
    }
}

socket.on("connect", function() {
	socket.emit("client-connect");
});

socket.on('updateCount', function(data) {
	counter.innerHTML = data;
	title.innerHTML = data;
});

socket.on("updateUserList", function(data){

	var list = document.getElementById("cont-list");
	list.innerHTML = "";
	
	function compare(a,b) {
	  if (a.score < b.score)
	    return 1;
	  if (a.score > b.score)
	    return -1;
	  return 0;
	}

	data.sort(compare);


	for(var i = 0; i < data.length; i++){

		var li = document.createElement('li');
	    li.appendChild(document.createTextNode(data[i].name + " : " + data[i].score));
	    li.id = "cont-li";
	    list.appendChild(li);
	}

	
	
});

function updateName(){
	var name = document.getElementById("name-field").value;
	
	if(name === ""){
		alert("Name cannot be empty!");
	}else{
		if(name.length > 20){
			alert("Name cannot be more than 20 characters!");
		}else{
			socket.emit("updatename", name);
			alert("Name updated successfully!");
		}
	}
}


