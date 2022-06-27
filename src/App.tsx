import { Client } from "boardgame.io/react";
import { YoyGame } from "./YoyGame";
import { YoyBoard } from "./YoyBoard";

const App = Client({
  game: YoyGame,
  board: YoyBoard,
});

export default App;
