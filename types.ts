export enum PieceType {
  PAWN = 'pawn',
  ROOK = 'rook',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king',
}

export enum Color {
  WHITE = 'white',
  BLACK = 'black',
}

export interface Piece {
  type: PieceType;
  color: Color;
}

export interface Square {
  row: number;
  col: number;
}

export interface Move {
  from: Square;
  to: Square;
  promotion?: PieceType;
}

export type Board = (Piece | null)[][];

export interface GameState {
  board: Board;
  turn: Color;
  inCheck: Color | null;
  isCheckmate: boolean;
  isStalemate: boolean;
  isGameOver: boolean;
  gameOverReason: 'checkmate' | 'stalemate' | 'timeout' | null;
  winner: Color | null;
  capturedPieces: {
    [key in Color]: Piece[];
  };
  moveHistory: Move[];
}

export interface ChatMessage {
    sender: 'You' | 'Opponent';
    text: string;
    timestamp: string;
}

export type PieceSet = 'classic' | 'geometric';
export type Theme = 'dark' | 'light';

export interface Settings {
  pieceSet: PieceSet;
  theme: Theme;
  enableAnimations: boolean;
  enableSound: boolean;
}