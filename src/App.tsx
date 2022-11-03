import React, { useState, useEffect } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import { EndGame } from "./components/EndGame";
import { LostFigures } from "./components/LostFigures";
import { Timer } from "./components/Timer";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  // функция для начала новой игры
  function restart() {
    const newBoard = new Board();
    newBoard.initCells(); // инициализируем ячейки
    newBoard.addFigures(); // добавляем фигуры
    setBoard(newBoard);
  }

  // функция для переключения текущего игрока
  function swapPlay() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }
  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <div className="boardWrapper">
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlay={swapPlay}
        ></BoardComponent>
        {/* <EndGame text="Вы выиграли" type="win" /> */}
      </div>
      <div>
        <LostFigures
          title={"Черные фигуры"}
          figures={board.lostBlackFigures}
        ></LostFigures>
        <LostFigures
          title={"Белые фигуры"}
          figures={board.lostWhiteFigures}
        ></LostFigures>
      </div>
    </div>
  );
};

export default App;
