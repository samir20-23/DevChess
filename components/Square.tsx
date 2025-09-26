import React from 'react';
import Piece from './Piece';
import { Piece as PieceType, PieceSet } from '../types';

interface Props {
  piece: PieceType | null;
  pieceSet: PieceSet;
  isLight: boolean;
  isSelected: boolean;
  isLegalMove: boolean;
  isCheck: boolean;
  onClick: () => void;
}

const SquareComponent: React.FC<Props> = ({ piece, pieceSet, isLight, isSelected, isLegalMove, isCheck, onClick }) => {
  const bgVar = isLight ? 'var(--bg-board-light)' : 'var(--bg-board-dark)';
  const checkStyle = isCheck ? { background: 'radial-gradient(circle, var(--warning-color) 20%, transparent 80%)' } : {};
  const selectedStyle = isSelected ? { boxShadow: `inset 0 0 0 var(--highlight-border-width) var(--highlight-color)` } : {};

  return (
    <div
      onClick={onClick}
      className={`w-full h-full flex justify-center items-center relative`}
      style={{ backgroundColor: bgVar, ...checkStyle, ...selectedStyle }}
    >
      {piece && <Piece piece={piece} pieceSet={pieceSet} />}
      {isLegalMove && (
        <div 
          className="absolute w-1/3 h-1/3 rounded-full pointer-events-none" 
          style={{ backgroundColor: 'var(--legal-move-color)'}}
        />
      )}
    </div>
  );
};

export default SquareComponent;
