const Datastore = require("nedb-promises");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let datastore = Datastore.create('./colors.db')

const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/colors", async (req, res) => {
	const colors = await datastore.find({});
	res.json({ data: colors });
});

app.post("/api/colors", async (req, res) => {
	const { color } = req.body;
	await datastore.insert({ color });
	res.json({ message: "ok" });
});

app.delete("/api/colors", async (req, res) => {
	await datastore.remove({}, { multi: true });
	res.json({ message: "ok" });
});

io.on('connection', (socket) => {
  console.log('a user connected');
	socket.on('disconnect', () => {
    console.log('user disconnected');
  });

	socket.on('color', (msg) => {
    socket.broadcast.emit('color', msg);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
