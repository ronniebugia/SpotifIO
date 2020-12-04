const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 8888;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

var messages = ["Beginning of the Game!"];

var users = [];

io.on('connection', socket => {

    // Send Chat Message
    socket.on('send-chat-message', message => {
        console.log("Sending Chat Message: " + message);
        messages.push(message); // Push message to current list of messages
        io.sockets.emit('chat-message', messages);
    });

    // New User
    socket.on('new-user', userName => {
        console.log("Adding new User: " + userName);
        messages.push("Welcome " + userName + "!"); // Create Welcome Message
        users.push({ // Adds User to list of users
            'name': userName,
            'score': 0
        });
        io.sockets.emit('chat-message', messages); // Send Updated Message log to everyone
        io.sockets.emit('new-user-joined', users); // Update users on front-end
    })

});



server.listen(port, () => console.log(`Listening on port ${port}`));
