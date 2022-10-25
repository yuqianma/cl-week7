const Datastore = require("nedb-promises");
const express = require("express");

let datastore = Datastore.create('./colors.db')

const app = express();

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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
