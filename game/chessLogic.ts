
import { Board, Color, Piece, PieceType, Square, Move } from '../types';

export const getInitialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));

  const placePiece = (row: number, col: number, type: PieceType, color: Color) => {
    board[row][col] = { type, color };
  };

  const backRank = [PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN, PieceType.KING, PieceType.BISHOP, PieceType.KNIGHT, PieceType.ROOK];
  
  for (let i = 0; i < 8; i++) {
    placePiece(0, i, backRank[i], Color.BLACK);
    placePiece(1, i, PieceType.PAWN, Color.BLACK);
    placePiece(6, i, PieceType.PAWN, Color.WHITE);
    placePiece(7, i, backRank[i], Color.WHITE);
  }

  return board;
};

const isSquareOnBoard = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

const getPieceMoves = (board: Board, row: number, col: number): Square[] => {
  const piece = board[row][col];
  if (!piece) return [];

  const moves: Square[] = [];
  const addMove = (r: number, c: number, canCapture: boolean, mustCapture: boolean) => {
    if (!isSquareOnBoard(r, c)) return;
    const targetPiece = board[r][c];
    if (targetPiece) {
        if (canCapture && targetPiece.color !== piece.color) {
            moves.push({ row: r, col: c });
        }
    } else {
        if (!mustCapture) {
            moves.push({ row: r, col: c });
        }
    }
  };

  const addSlidingMoves = (directions: number[][]) => {
    for (const [dr, dc] of directions) {
      for (let i = 1; i < 8; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        if (!isSquareOnBoard(r, c)) break;
        const targetPiece = board[r][c];
        if (targetPiece) {
          if (targetPiece.color !== piece.color) {
            moves.push({ row: r, col: c });
          }
          break;
        }
        moves.push({ row: r, col: c });
      }
    }
  };

  switch (piece.type) {
    case PieceType.PAWN:
      const direction = piece.color === Color.WHITE ? -1 : 1;
      const startRow = piece.color === Color.WHITE ? 6 : 1;
      // Forward 1
      if (isSquareOnBoard(row + direction, col) && !board[row + direction][col]) {
        moves.push({ row: row + direction, col });
      }
      // Forward 2
      if (row === startRow && !board[row + direction][col] && !board[row + 2 * direction][col]) {
        moves.push({ row: row + 2 * direction, col });
      }
      // Captures
      for (const dc of [-1, 1]) {
        if (isSquareOnBoard(row + direction, col + dc) && board[row + direction][col + dc]?.color !== piece.color && board[row + direction][col + dc]) {
          moves.push({ row: row + direction, col: col + dc });
        }
      }
      break;
    case PieceType.ROOK:
      addSlidingMoves([[0, 1], [0, -1], [1, 0], [-1, 0]]);
      break;
    case PieceType.KNIGHT:
      const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
      knightMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc, true, false));
      break;
    case PieceType.BISHOP:
      addSlidingMoves([[1, 1], [1, -1], [-1, 1], [-1, -1]]);
      break;
    case PieceType.QUEEN:
      addSlidingMoves([[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]);
      break;
    case PieceType.KING:
      const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      kingMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc, true, false));
      break;
  }
  return moves;
};

const isSquareAttacked = (board: Board, row: number, col: number, attackerColor: Color): boolean => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === attackerColor) {
        const moves = getPieceMoves(board, r, c);
        if (moves.some(move => move.row === row && move.col === col)) {
          return true;
        }
      }
    }
  }
  return false;
};

const findKing = (board: Board, color: Color): Square | null => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.type === PieceType.KING && piece.color === color) {
        return { row: r, col: c };
      }
    }
  }
  return null;
};

export const isKingInCheck = (board: Board, color: Color): boolean => {
  const kingPos = findKing(board, color);
  if (!kingPos) return false; // Should not happen in a real game
  const opponentColor = color === Color.WHITE ? Color.BLACK : Color.WHITE;
  return isSquareAttacked(board, kingPos.row, kingPos.col, opponentColor);
};

export const getLegalMoves = (board: Board, row: number, col: number): Square[] => {
    const piece = board[row][col];
    if (!piece) return [];
    
    const pseudoLegalMoves = getPieceMoves(board, row, col);
    const legalMoves: Square[] = [];

    for (const move of pseudoLegalMoves) {
        const tempBoard = board.map(r => [...r]);
        tempBoard[move.row][move.col] = tempBoard[row][col];
        tempBoard[row][col] = null;
        if (!isKingInCheck(tempBoard, piece.color)) {
            legalMoves.push(move);
        }
    }
    return legalMoves;
};

export const hasAnyLegalMoves = (board: Board, color: Color): boolean => {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && piece.color === color) {
                if (getLegalMoves(board, r, c).length > 0) {
                    return true;
                }
            }
        }
    }
    return false;
};

export const isPawnPromotion = (piece: Piece, to: Square): boolean => {
    if (piece.type !== PieceType.PAWN) return false;
    const promotionRow = piece.color === Color.WHITE ? 0 : 7;
    return to.row === promotionRow;
};
