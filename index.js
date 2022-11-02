const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const players = {
	leader: null,
	playerX: null,
	playerY: null,
};
const position = { x: 0, y: 0 };

app.get('/api/online', (req, res) => {
	res.json({ data: players });
});

io.on('connection', (socket) => {
  console.log('a user connected');
	let role;
	socket.on('role', (data) => {
		role = data.role;
		players[role] = true;
		socket.broadcast.emit('role', players);
	});
	socket.on('disconnect', () => {
		players[role] = false;
		socket.broadcast.emit('role', players);
    console.log('user disconnected');
  });

	socket.on('cmd', (msg) => {
		const { x = 0, y = 0, draw = false } = msg;
		position.x += x;
		position.y += y;
		console.log(msg, { position, draw });
    // socket.broadcast.emit('cmd', { position, draw });
		io.emit('cmd', { position, draw });
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
