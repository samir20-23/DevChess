
import React from 'react';
import { PIECE_COMPONENTS } from '../constants';
import { Piece as PieceProps } from '../types';

interface Props {
  piece: PieceProps;
}

const Piece: React.FC<Props> = ({ piece }) => {
  const PieceComponent = PIECE_COMPONENTS[piece.type];
  const pieceColorClass = piece.color === 'white' ? 'text-gray-100' : 'text-gray-900';
  
  return (
    <div className="w-full h-full flex items-center justify-center cursor-pointer">
      <PieceComponent className={`${pieceColorClass} w-10/12 h-10/12`} />
    </div>
  );
};

export default Piece;
