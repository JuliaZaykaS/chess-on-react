import React, { FC, useState, useEffect } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlay: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlay,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  // функция, которая будет отрабатывать клик по ячейке
  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlay();
      setSelectedCell(null);
      updateBoard();
    } else {
      //проверка,чтобы нельзя было выделять вражеские фигуры
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }
  // функция, которая подсвечивает ячейки, куда можно совершить ход
  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  //функция для обновления состояния, чтобы реакт перерисовал всю доску
  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h2>Текущий игрок {currentPlayer?.color}</h2>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
                click={click}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
