
import React, { useState, useEffect, useCallback } from 'react';
import Chessboard from './components/Chessboard';
import GameInfo from './components/GameInfo';
import ChatWindow from './components/ChatWindow';
import PromotionDialog from './components/PromotionDialog';
import { getInitialBoard, getLegalMoves, isKingInCheck, hasAnyLegalMoves, isPawnPromotion } from './game/chessLogic';
import { GameState, Square, Color, Piece, PieceType, Move, Board } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => createNewGameState());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [promotionMove, setPromotionMove] = useState<Move | null>(null);
  
  function createNewGameState(): GameState {
    return {
      board: getInitialBoard(),
      turn: Color.WHITE,
      inCheck: null,
      isCheckmate: false,
      isStalemate: false,
      isGameOver: false,
      capturedPieces: { [Color.WHITE]: [], [Color.BLACK]: [] },
      moveHistory: [],
    };
  }

  const handleNewGame = () => {
    setGameState(createNewGameState());
    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotionMove(null);
  };

  const updateGameStatus = useCallback((board: Board, turn: Color, moveHistory: Move[]) => {
    const opponentColor = turn === Color.WHITE ? Color.BLACK : Color.WHITE;
    const isInCheck = isKingInCheck(board, opponentColor);
    const hasMoves = hasAnyLegalMoves(board, opponentColor);

    let isCheckmate = false;
    let isStalemate = false;

    if (!hasMoves) {
      if (isInCheck) {
        isCheckmate = true;
      } else {
        isStalemate = true;
      }
    }

    setGameState(prevState => ({
      ...prevState,
      board,
      turn: opponentColor,
      inCheck: isInCheck ? opponentColor : null,
      isCheckmate,
      isStalemate,
      isGameOver: isCheckmate || isStalemate,
      moveHistory
    }));

  }, []);

  const movePiece = useCallback((from: Square, to: Square, promotion?: PieceType) => {
    setGameState(prevState => {
      const newBoard = prevState.board.map(r => [...r]);
      const piece = newBoard[from.row][from.col] as Piece;
      const capturedPiece = newBoard[to.row][to.col];
      
      const newCaptured = { ...prevState.capturedPieces };
      if (capturedPiece) {
        newCaptured[piece.color].push(capturedPiece);
      }

      if (promotion) {
          newBoard[to.row][to.col] = { type: promotion, color: piece.color };
      } else {
          newBoard[to.row][to.col] = piece;
      }
      
      newBoard[from.row][from.col] = null;

      const newHistory = [...prevState.moveHistory, {from, to, promotion}];
      
      updateGameStatus(newBoard, prevState.turn, newHistory);

      return {
          ...prevState,
          board: newBoard,
          capturedPieces: newCaptured
      };
    });

    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotionMove(null);
  }, [updateGameStatus]);

  const handlePromotionSelect = (pieceType: PieceType) => {
    if (promotionMove) {
      movePiece(promotionMove.from, promotionMove.to, pieceType);
    }
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameState.isGameOver || gameState.turn !== Color.WHITE) return;

    if (selectedSquare) {
      const isLegal = legalMoves.some(m => m.row === row && m.col === col);
      if (isLegal) {
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
    if (gameState.isGameOver || gameState.turn !== Color.BLACK) return;

    const allMoves: Move[] = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = gameState.board[r][c];
            if (piece && piece.color === Color.BLACK) {
                const moves = getLegalMoves(gameState.board, r, c);
                moves.forEach(to => allMoves.push({ from: { row: r, col: c }, to }));
            }
        }
    }

    if (allMoves.length > 0) {
        const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
        const piece = gameState.board[randomMove.from.row][randomMove.from.col];
        if(piece && isPawnPromotion(piece, randomMove.to)){
             movePiece(randomMove.from, randomMove.to, PieceType.QUEEN); // AI always promotes to queen
        } else {
             movePiece(randomMove.from, randomMove.to);
        }
    }
  }, [gameState.board, gameState.isGameOver, gameState.turn, movePiece]);


  useEffect(() => {
    if (gameState.turn === Color.BLACK && !gameState.isGameOver) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 1000);
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
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="text-4xl font-bold text-white mb-4">React Chess Online</h1>
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 lg:w-3/4 relative">
          <Chessboard
            board={gameState.board}
            onSquareClick={handleSquareClick}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            kingInCheck={kingInCheckSquare}
            isFlipped={false}
          />
          {promotionMove && <PromotionDialog color={gameState.turn} onSelect={handlePromotionSelect} />}
        </div>
        <div className="md:w-1/3 lg:w-1/4 flex flex-col gap-6">
          <GameInfo gameState={gameState} onNewGame={handleNewGame} />
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default App;
