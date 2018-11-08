const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../Client/');
const {Users} = require('./utils/users');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//The server listens on port 3000
server.listen(3000, () => {
    console.log("Server started on port 3000");
});

var count = 0;

io.on('connection', (socket) => {

	socket.on("client-connect", () =>{

		users.removeUser(socket.id);
        users.addUser(socket.id, "Unknown", 0);

        io.emit('updateUserList', users.getUserList());

		socket.emit("updateCount", count);
	});

	socket.on("increaseCount", (data) =>{
		count += 1;

		users.increasePersonalCount(socket.id);

		io.emit("updateCount", count);
		io.emit('updateUserList', users.getUserList());

	});

	socket.on("updatename", (data) =>{
		users.updateName(socket.id, data);
		io.emit('updateUserList', users.getUserList());
	});

	socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user){
            io.emit('updateUserList', users.getUserList());
        }
    });

	

});