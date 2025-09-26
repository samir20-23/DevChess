
import React from 'react';
import { Color, PieceType } from '../types';
import { PIECE_COMPONENTS, PROMOTION_PIECES } from '../constants';

interface Props {
  color: Color;
  onSelect: (piece: PieceType) => void;
}

const PromotionDialog: React.FC<Props> = ({ color, onSelect }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-600">
        <h3 className="text-xl font-bold text-center mb-4 text-white">Promote Pawn</h3>
        <div className="flex space-x-4">
          {PROMOTION_PIECES.map(pieceType => {
            const PieceComponent = PIECE_COMPONENTS[pieceType];
            const pieceColorClass = color === Color.WHITE ? 'text-gray-100' : 'text-gray-900';
            return (
              <button
                key={pieceType}
                onClick={() => onSelect(pieceType)}
                className="w-16 h-16 bg-gray-600 hover:bg-gray-500 rounded-md p-2 transition-colors"
              >
                <PieceComponent className={pieceColorClass} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PromotionDialog;
