
import React from 'react';
import SquareComponent from './Square';
import { Board, Square, Color } from '../types';

interface Props {
  board: Board;
  onSquareClick: (row: number, col: number) => void;
  selectedSquare: Square | null;
  legalMoves: Square[];
  kingInCheck: Square | null;
  isFlipped: boolean;
}

const Chessboard: React.FC<Props> = ({ board, onSquareClick, selectedSquare, legalMoves, kingInCheck, isFlipped }) => {
  const renderBoard = () => {
    const boardToRender = isFlipped ? [...board].reverse().map(row => [...row].reverse()) : board;
    return boardToRender.map((row, rowIndex) =>
      row.map((piece, colIndex) => {
        const originalRow = isFlipped ? 7 - rowIndex : rowIndex;
        const originalCol = isFlipped ? 7 - colIndex : colIndex;

        const isLight = (originalRow + originalCol) % 2 !== 0;
        const isSelected = selectedSquare?.row === originalRow && selectedSquare?.col === originalCol;
        const isLegalMove = legalMoves.some(m => m.row === originalRow && m.col === originalCol);
        const isCheck = kingInCheck?.row === originalRow && kingInCheck?.col === originalCol;

        return (
          <SquareComponent
            key={`${originalRow}-${originalCol}`}
            piece={piece}
            isLight={isLight}
            isSelected={isSelected}
            isLegalMove={isLegalMove}
            isCheck={isCheck}
            onClick={() => onSquareClick(originalRow, originalCol)}
          />
        );
      })
    );
  };

  return (
    <div className="aspect-square w-full max-w-[70vh] shadow-2xl grid grid-cols-8 grid-rows-8 border-4 border-gray-900">
      {renderBoard()}
    </div>
  );
};

export default Chessboard;
