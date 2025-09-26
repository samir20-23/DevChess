import React, { useState } from 'react';
import Piece from './Piece';
import { Color, GameState, Piece as PieceInfo, Settings, PieceSet, Theme } from '../types';

interface Props {
  gameState: GameState;
  onNewGame: () => void;
  timers: { white: number; black: number; };
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const CapturedPieces: React.FC<{ pieces: PieceInfo[], pieceSet: PieceSet }> = ({ pieces, pieceSet }) => (
  <div className="flex flex-wrap items-center gap-1 min-h-[28px]">
    {pieces.map((p, i) => (
      <div key={i} className="w-5 h-5">
        <Piece piece={p} pieceSet={pieceSet} />
      </div>
    ))}
  </div>
);

const PlayerInfo: React.FC<{ color: Color, time: number, capturedPieces: PieceInfo[], pieceSet: PieceSet, isTurn: boolean, isLowTime: boolean }> = ({ color, time, capturedPieces, pieceSet, isTurn, isLowTime }) => {
  const playerName = color.charAt(0).toUpperCase() + color.slice(1);
  return (
    <div className={`p-3 rounded-md transition-all ${isTurn ? 'border-2' : 'border-2 border-transparent'}`} style={{ backgroundColor: 'var(--bg-secondary)', borderColor: isTurn ? 'var(--accent-primary)' : 'transparent' }}>
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg" style={{ color: 'var(--text-primary)'}}>{playerName}</span>
        <div className={`text-2xl font-mono px-3 py-1 rounded-md ${isLowTime ? 'animate-pulse' : ''}`} style={{ backgroundColor: 'var(--bg-primary)', color: isLowTime ? 'var(--warning-color)' : 'var(--text-primary)' }}>
          {formatTime(time)}
        </div>
      </div>
      <div className="mt-2">
        <CapturedPieces pieces={capturedPieces} pieceSet={pieceSet} />
      </div>
    </div>
  );
};

const GameInfo: React.FC<Props> = ({ gameState, onNewGame, timers, settings, onSettingsChange }) => {
  const { turn, isCheckmate, isStalemate, isGameOver, gameOverReason, winner, capturedPieces } = gameState;
  const [showSettings, setShowSettings] = useState(false);

  let statusText = `${turn.charAt(0).toUpperCase() + turn.slice(1)}'s turn`;
  if (gameState.inCheck && !isGameOver) {
      statusText = `${gameState.inCheck.charAt(0).toUpperCase() + gameState.inCheck.slice(1)} is in Check!`;
  }
  
  let resultText = '';
  if (isCheckmate) {
    resultText = `Checkmate! ${winner} wins.`;
  } else if (isStalemate) {
    resultText = "Stalemate! It's a draw.";
  } else if (gameOverReason === 'timeout') {
    resultText = `Time's up! ${winner} wins.`;
  }

  return (
    <div className="w-full p-4 rounded-lg flex flex-col justify-between gap-4" style={{ backgroundColor: 'var(--bg-secondary)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-primary)'}}>
      <PlayerInfo 
        color={Color.BLACK} 
        time={timers.black} 
        capturedPieces={capturedPieces[Color.WHITE]} 
        pieceSet={settings.pieceSet} 
        isTurn={turn === Color.BLACK && !isGameOver}
        isLowTime={timers.black < 30}
      />

      <div className="text-center h-20 flex flex-col justify-center items-center">
        {isGameOver ? (
          <div className="p-4 rounded-md w-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <h3 className="text-xl font-bold">Game Over</h3>
            <p style={{ color: 'var(--text-secondary)'}}>{resultText}</p>
          </div>
        ) : (
          <div className="text-lg font-semibold h-12 flex items-center justify-center" style={{ color: 'var(--text-secondary)'}}>
            {statusText}
          </div>
        )}
      </div>

      <PlayerInfo 
        color={Color.WHITE} 
        time={timers.white} 
        capturedPieces={capturedPieces[Color.BLACK]} 
        pieceSet={settings.pieceSet} 
        isTurn={turn === Color.WHITE && !isGameOver}
        isLowTime={timers.white < 30}
      />
      
      {showSettings && (
        <div className="p-4 rounded-md space-y-4" style={{ backgroundColor: 'var(--bg-primary)'}}>
           <h3 className="text-lg font-bold border-b" style={{borderColor: 'var(--border-primary)'}}>Settings</h3>
            <div className="flex justify-between items-center">
             <label htmlFor="theme" className="text-sm font-medium">Theme</label>
             <select id="theme" value={settings.theme} onChange={e => onSettingsChange({ theme: e.target.value as Theme })} className="rounded p-1" style={{backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)'}}>
               <option value="light">Light</option>
               <option value="dark">Dark</option>
             </select>
           </div>
           <div className="flex justify-between items-center">
             <label htmlFor="pieceSet" className="text-sm font-medium">Piece Set</label>
             <select id="pieceSet" value={settings.pieceSet} onChange={e => onSettingsChange({ pieceSet: e.target.value as PieceSet })} className="rounded p-1" style={{backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)'}}>
               <option value="classic">Classic</option>
               <option value="geometric">Geometric</option>
             </select>
           </div>
           <div className="flex justify-between items-center">
             <label htmlFor="animations" className="text-sm font-medium">Animations</label>
             <input type="checkbox" id="animations" checked={settings.enableAnimations} onChange={e => onSettingsChange({ enableAnimations: e.target.checked })} />
           </div>
           <div className="flex justify-between items-center">
             <label htmlFor="sound" className="text-sm font-medium">Sound</label>
             <input type="checkbox" id="sound" checked={settings.enableSound} onChange={e => onSettingsChange({ enableSound: e.target.checked })} />
           </div>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => setShowSettings(s => !s)} className="w-full font-bold py-2 px-4 rounded-md transition-colors" style={{ backgroundColor: 'var(--bg-interactive)', color: 'var(--text-primary)'}}>{showSettings ? 'Close Settings' : 'Settings'}</button>
        <button onClick={onNewGame} className="w-full font-bold py-2 px-4 rounded-md transition-colors" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-inverted)'}}>New Game</button>
      </div>
    </div>
  );
};

export default GameInfo;