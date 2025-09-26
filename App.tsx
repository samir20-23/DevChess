import React, { useState, useEffect, useCallback } from 'react';
import Chessboard from './components/Chessboard';
import GameInfo from './components/GameInfo';
import ChatWindow from './components/ChatWindow';
import PromotionDialog from './components/PromotionDialog';
import { getInitialBoard, getLegalMoves, isKingInCheck, hasAnyLegalMoves, isPawnPromotion } from './game/chessLogic';
import { GameState, Square, Color, Piece, PieceType, Move, Board, Settings } from './types';

const INITIAL_TIME = 600; // 10 minutes in seconds

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createNewGameState);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [promotionMove, setPromotionMove] = useState<Move | null>(null);
  const [settings, setSettings] = useState<Settings>({ pieceSet: 'classic', theme: 'light', enableAnimations: true, enableSound: true });
  const [timers, setTimers] = useState({ white: INITIAL_TIME, black: INITIAL_TIME });
  const [captureInfo, setCaptureInfo] = useState<{ square: Square, key: number } | null>(null);

  function createNewGameState(): GameState {
    return {
      board: getInitialBoard(),
      turn: Color.WHITE,
      inCheck: null,
      isCheckmate: false,
      isStalemate: false,
      isGameOver: false,
      gameOverReason: null,
      winner: null,
      capturedPieces: { [Color.WHITE]: [], [Color.BLACK]: [] },
      moveHistory: [],
    };
  }

  const handleNewGame = () => {
    setGameState(createNewGameState());
    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotionMove(null);
    setTimers({ white: INITIAL_TIME, black: INITIAL_TIME });
  };

  const handleSettingsChange = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const gameOver = useCallback((reason: 'checkmate' | 'stalemate' | 'timeout', winner: Color | null) => {
    setGameState(prev => ({
        ...prev,
        isGameOver: true,
        isCheckmate: reason === 'checkmate',
        isStalemate: reason === 'stalemate',
        gameOverReason: reason,
        winner: winner,
    }));
  }, []);

  useEffect(() => {
    if (gameState.isGameOver) return;
    
    const timer = setInterval(() => {
      setTimers(prev => {
        const newTime = gameState.turn === Color.WHITE ? prev.white - 1 : prev.black - 1;
        if (newTime <= 0) {
            clearInterval(timer);
            gameOver('timeout', gameState.turn === Color.WHITE ? Color.BLACK : Color.WHITE);
            return { ...prev, [gameState.turn]: 0 };
        }
        return { ...prev, [gameState.turn]: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.turn, gameState.isGameOver, gameOver]);

  const updateGameStatus = useCallback((board: Board, turn: Color, moveHistory: Move[]) => {
    const opponentColor = turn === Color.WHITE ? Color.BLACK : Color.WHITE;
    const isInCheck = isKingInCheck(board, opponentColor);
    const hasMoves = hasAnyLegalMoves(board, opponentColor);

    if (!hasMoves) {
      if (isInCheck) {
        gameOver('checkmate', turn);
      } else {
        gameOver('stalemate', null);
      }
    }

    setGameState(prevState => ({
      ...prevState,
      board,
      turn: opponentColor,
      inCheck: isInCheck ? opponentColor : null,
      moveHistory
    }));

  }, [gameOver]);
  
  const playCaptureSound = useCallback(() => {
    if (!settings.enableSound) return;
    const audioContext = new (window.AudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [settings.enableSound]);

  const movePiece = useCallback((from: Square, to: Square, promotion?: PieceType) => {
    setGameState(prevState => {
      const newBoard = prevState.board.map(r => [...r]);
      const piece = newBoard[from.row][from.col] as Piece;
      const capturedPiece = newBoard[to.row][to.col];
      
      if (capturedPiece) {
        if(settings.enableAnimations) setCaptureInfo({ square: to, key: Date.now() });
        playCaptureSound();
      }

      const newCaptured = { ...prevState.capturedPieces };
      if (capturedPiece) {
        newCaptured[piece.color].push(capturedPiece);
      }

      newBoard[to.row][to.col] = promotion ? { type: promotion, color: piece.color } : piece;
      newBoard[from.row][from.col] = null;

      const newHistory = [...prevState.moveHistory, {from, to, promotion}];
      
      // Defer status update to allow state to settle
      setTimeout(() => updateGameStatus(newBoard, prevState.turn, newHistory), 0);

      return {
          ...prevState,
          board: newBoard,
          capturedPieces: newCaptured
      };
    });

    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotionMove(null);
  }, [updateGameStatus, settings.enableAnimations, playCaptureSound]);

  const handlePromotionSelect = (pieceType: PieceType) => {
    if (promotionMove) {
      movePiece(promotionMove.from, promotionMove.to, pieceType);
    }
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameState.isGameOver || gameState.turn !== Color.WHITE) return;

    if (selectedSquare) {
      if (legalMoves.some(m => m.row === row && m.col === col)) {
        const piece = gameState.board[selectedSquare.row][selectedSquare.col];
        if (piece && isPawnPromotion(piece, { row, col })) {
          setPromotionMove({ from: selectedSquare, to: { row, col } });
        } else {
          movePiece(selectedSquare, { row, col });
        }
      } else {
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    } else {
      const piece = gameState.board[row][col];
      if (piece && piece.color === gameState.turn) {
        setSelectedSquare({ row, col });
        setLegalMoves(getLegalMoves(gameState.board, row, col));
      }
    }
  };
  
  const makeAIMove = useCallback(() => {
    const allMoves: Move[] = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = gameState.board[r][c];
            if (piece && piece.color === Color.BLACK) {
                getLegalMoves(gameState.board, r, c)
                  .forEach(to => allMoves.push({ from: { row: r, col: c }, to }));
            }
        }
    }

    if (allMoves.length > 0) {
        const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
        const piece = gameState.board[randomMove.from.row][randomMove.from.col];
        if(piece && isPawnPromotion(piece, randomMove.to)){
             movePiece(randomMove.from, randomMove.to, PieceType.QUEEN);
        } else {
             movePiece(randomMove.from, randomMove.to);
        }
    }
  }, [gameState.board, movePiece]);

  useEffect(() => {
    if (gameState.turn === Color.BLACK && !gameState.isGameOver) {
      const timer = setTimeout(makeAIMove, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.turn, gameState.isGameOver, makeAIMove]);

  const kingInCheckSquare = gameState.inCheck ? 
    (() => {
        for(let r=0; r<8; r++) {
            for(let c=0; c<8; c++) {
                const p = gameState.board[r][c];
                if (p?.type === PieceType.KING && p?.color === gameState.inCheck) {
                    return {row: r, col: c};
                }
            }
        }
        return null;
    })() 
    : null;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${settings.theme}`}>
      <h1 className="text-4xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>React Chess Online</h1>
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="md:w-auto md:flex-grow relative flex justify-center">
          <Chessboard
            board={gameState.board}
            onSquareClick={handleSquareClick}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            kingInCheck={kingInCheckSquare}
            isFlipped={false}
            pieceSet={settings.pieceSet}
            captureInfo={captureInfo}
          />
          {promotionMove && <PromotionDialog color={gameState.turn} onSelect={handlePromotionSelect} pieceSet={settings.pieceSet}/>}
        </div>
        <div className="md:w-[350px] flex flex-col gap-6">
          <GameInfo gameState={gameState} onNewGame={handleNewGame} timers={timers} settings={settings} onSettingsChange={handleSettingsChange}/>
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default App;