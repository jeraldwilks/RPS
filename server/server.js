import express from "express";

const app = express();
const PORT = process.env.PORT || 5050;

const moves = ["Rock", "Paper", "Scissors"];
app.use(express.json());
app.get("/rps", (req, res) => {
  const choice = Math.floor(Math.random() * moves.length);
  const move = moves[choice];
  res.send(move);
});

app.listen(PORT, () => {
  console.log(`Listening on port: `, PORT);
});

// app.use(express.static("public"));
app.use(express.static("../frontend/dist/"));
