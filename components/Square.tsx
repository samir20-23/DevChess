
import React from 'react';
import Piece from './Piece';
import { Piece as PieceType } from '../types';

interface Props {
  piece: PieceType | null;
  isLight: boolean;
  isSelected: boolean;
  isLegalMove: boolean;
  isCheck: boolean;
  onClick: () => void;
}

const SquareComponent: React.FC<Props> = ({ piece, isLight, isSelected, isLegalMove, isCheck, onClick }) => {
  const bgClass = isLight ? 'bg-green-100' : 'bg-green-700';
  const checkClass = isCheck ? 'bg-red-500' : '';

  return (
    <div
      onClick={onClick}
      className={`w-full h-full flex justify-center items-center relative ${bgClass} ${checkClass}`}
    >
      {piece && <Piece piece={piece} />}
      {isSelected && <div className="absolute inset-0 border-4 border-yellow-400" />}
      {isLegalMove && (
        <div className="absolute w-1/3 h-1/3 rounded-full bg-black bg-opacity-30 pointer-events-none" />
      )}
    </div>
  );
};

export default SquareComponent;
