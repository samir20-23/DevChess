
import React from 'react';
import Piece from './Piece';
import { Color, GameState, Piece as PieceInfo } from '../types';

interface Props {
  gameState: GameState;
  onNewGame: () => void;
}

const CapturedPieces: React.FC<{ pieces: PieceInfo[] }> = ({ pieces }) => (
  <div className="flex flex-wrap items-center gap-1 min-h-[32px]">
    {pieces.map((p, i) => (
      <div key={i} className="w-6 h-6">
        <Piece piece={p} />
      </div>
    ))}
  </div>
);

const GameInfo: React.FC<Props> = ({ gameState, onNewGame }) => {
  const { turn, isCheckmate, isStalemate, isGameOver, capturedPieces } = gameState;

  let statusText = `${turn.charAt(0).toUpperCase() + turn.slice(1)}'s turn`;
  if (isCheckmate) {
    statusText = `Checkmate! ${turn === Color.WHITE ? 'Black' : 'White'} wins.`;
  } else if (isStalemate) {
    statusText = "Stalemate! It's a draw.";
  } else if (gameState.inCheck) {
      statusText = `${gameState.inCheck.charAt(0).toUpperCase() + gameState.inCheck.slice(1)} is in Check!`;
  }

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-between">
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Game Status</h2>
            <div className="text-center text-lg font-semibold p-3 rounded-md bg-gray-800 mb-4 h-12 flex items-center justify-center">
                {statusText}
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="font-bold text-gray-400">Captured by White:</h3>
                    <CapturedPieces pieces={capturedPieces[Color.WHITE]} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-400">Captured by Black:</h3>
                    <CapturedPieces pieces={capturedPieces[Color.BLACK]} />
                </div>
            </div>
        </div>
      
      {isGameOver && (
        <button
          onClick={onNewGame}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default GameInfo;
