import React, { useState, useEffect } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import { Board } from "./models/Board";

const App = () => {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restart();
  }, []);

  // функция для начала новой игры
  function restart() {
    const newBoard = new Board();
    newBoard.initCells(); // инициализируем ячейки
    newBoard.addFigures(); // добавляем фигуры
    setBoard(newBoard);
  }
  return (
    <div className="app">
      <BoardComponent board={board} setBoard={setBoard}></BoardComponent>
    </div>
  );
};

export default App;
