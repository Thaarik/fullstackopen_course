import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const handleVotes = () => {
    let voteCount = [...votes];
    voteCount[selected] += 1;
    setVotes(voteCount);
  };
  const handleSelection = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };
  console.log(Math.max(...votes));
  return (
    <div>
      <h2>Anecdote of the day </h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleSelection}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p> has {Math.max(...votes)} votes</p>
    </div>
  );
};

export default App;
