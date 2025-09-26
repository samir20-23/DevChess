import React from 'react';
import { Color, PieceType, PieceSet } from '../types';
import { PIECE_SETS, PROMOTION_PIECES } from '../constants';

interface Props {
  color: Color;
  onSelect: (piece: PieceType) => void;
  pieceSet: PieceSet;
}

const PromotionDialog: React.FC<Props> = ({ color, onSelect, pieceSet }) => {
  const pieceColorVar = color === Color.WHITE ? 'var(--piece-white)' : 'var(--piece-black)';

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="p-6 rounded-lg shadow-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)'}}>
        <h3 className="text-xl font-bold text-center mb-4" style={{color: 'var(--text-primary)'}}>Promote Pawn</h3>
        <div className="flex space-x-4">
          {PROMOTION_PIECES.map(pieceType => {
            const PieceComponent = PIECE_SETS[pieceSet][pieceType];
            return (
              <button
                key={pieceType}
                onClick={() => onSelect(pieceType)}
                className="w-16 h-16 rounded-md p-2 transition-colors"
                style={{ backgroundColor: 'var(--bg-interactive)', color: pieceColorVar, }}
              >
                <PieceComponent />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PromotionDialog;
