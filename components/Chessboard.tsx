import React from 'react';
import SquareComponent from './Square';
import { Board, Square, Color, PieceSet } from '../types';

interface Props {
  board: Board;
  onSquareClick: (row: number, col: number) => void;
  selectedSquare: Square | null;
  legalMoves: Square[];
  kingInCheck: Square | null;
  isFlipped: boolean;
  pieceSet: PieceSet;
  captureInfo: { square: Square, key: number } | null;
}

const CaptureAnimation = ({ square, isFlipped }: { square: Square; isFlipped: boolean }) => {
  const top = (isFlipped ? 7 - square.row : square.row) * 12.5;
  const left = (isFlipped ? 7 - square.col : square.col) * 12.5;
  
  return (
    <div className="absolute pointer-events-none" style={{ top: `${top}%`, left: `${left}%`, width: '12.5%', height: '12.5%' }}>
      <div className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{backgroundColor: 'var(--highlight-color)'}}></div>
    </div>
  );
};


const Chessboard: React.FC<Props> = ({ board, onSquareClick, selectedSquare, legalMoves, kingInCheck, isFlipped, pieceSet, captureInfo }) => {
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
            pieceSet={pieceSet}
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
    <div className="relative">
      <div 
        className="aspect-square w-full max-w-[70vh] grid grid-cols-8 grid-rows-8"
        style={{
            boxShadow: 'var(--shadow-lg)',
            border: `8px solid var(--bg-board-dark)`,
            borderRadius: '4px'
        }}
      >
        {renderBoard()}
      </div>
      {captureInfo && <CaptureAnimation key={captureInfo.key} square={captureInfo.square} isFlipped={isFlipped} />}
    </div>
  );
};

export default Chessboard;
