import { useState, useEffect } from "react";
import "./App.css";

function Button({ text, click }) {
  return <button onClick={click}>{text}</button>;
}
function App() {
  const [myGuess, setMyGuess] = useState("No guess yet");
  const [computerGuess, setComputerGuess] = useState("No guess yet");
  const [lastGuessTime, setLastGuessTime] = useState(new Date());

  let myGuessString = "You have not guessed yet";
  if (myGuess != "No guess yet") myGuessString = "You guessed " + myGuess;
  let computerGuessString = "I have not guessed yet";
  if (computerGuess != "No guess yet")
    computerGuessString = "I guessed " + computerGuess;

  let result = "It was a tie";

  if (
    (myGuess == "Rock" && computerGuess == "Scissors") ||
    (myGuess == "Paper" && computerGuess == "Rock") ||
    (myGuess == "Scissors" && computerGuess == "Paper")
  )
    result = "You won!";
  else if (
    (myGuess == "Scissors" && computerGuess == "Rock") ||
    (myGuess == "Rock" && computerGuess == "Paper") ||
    (myGuess == "Paper" && computerGuess == "Scissors")
  )
    result = "I won!";

  useEffect(() => {
    if (myGuess == "No guess yet") return;

    async function getComputerGuess() {
      const result = await fetch("/rps").then((response) => response.text());
      setComputerGuess(result);
    }

    getComputerGuess();
  }, [myGuess, lastGuessTime]);

  return (
    <div>
      <h1>Welcome to Rock, Paper, Scissors!</h1>
      <div>{myGuessString}</div>
      <div>{computerGuessString}</div>
      <div>{result}</div>
      <p>
        <Button
          text="Rock"
          click={() => {
            setMyGuess("Rock");
            setLastGuessTime(new Date());
          }}
        />
        <Button
          text="Paper"
          click={() => {
            setMyGuess("Paper");
            setLastGuessTime(new Date());
          }}
        />
        <Button
          text="Scissors"
          click={() => {
            setMyGuess("Scissors");
            setLastGuessTime(new Date());
          }}
        />
      </p>
    </div>
  );
}

export default App;
