import React from 'react';
import { PIECE_SETS } from '../constants';
import { Piece as PieceProps, PieceSet, Color } from '../types';

interface Props {
  piece: PieceProps;
  pieceSet: PieceSet;
}

const Piece: React.FC<Props> = ({ piece, pieceSet }) => {
  const PieceComponent = PIECE_SETS[pieceSet][piece.type];
  const pieceColorVar = piece.color === Color.WHITE ? 'var(--piece-white)' : 'var(--piece-black)';
  
  return (
    <div className="w-full h-full flex items-center justify-center cursor-pointer" style={{ color: pieceColorVar }}>
      <PieceComponent className={`w-10/12 h-10/12`} />
    </div>
  );
};

export default Piece;
