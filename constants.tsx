import React from 'react';
import { PieceType, Color } from './types';

// --- Classic Piece Set ---
const KingClassic: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" /><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-3-3-3s-3 3-3 3c-1.5 3 3 10.5 3 10.5" fill="currentColor" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s-2 1.5-5.5 1.5s-5-1.5-5.5-1.5s-5.5 1.5-5.5 1.5z" fill="currentColor" /><path d="M11.5 30c5.5-3 15.5-3 21 0m-21-4.5c5.5 3 15.5 3 21 0" /><path d="M11.5 37a35 35 1 0 0 21 0" fill="currentColor" /><path d="M11.5 30c5.5-3 15.5-3 21 0" /><path d="M11.5 25.5c5.5 3 15.5 3 21 0" /></g></svg>);
const QueenClassic: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm11.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm11.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm11.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM22.5 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14l2 12z" /><path d="M9 26c0 2 1.5 2 2 4 1 2-1 4 2.5 4 3 0 4-2 5-4 1-2 2.5-2 2.5-4-1.5-1.5-2-2.5-2.5-4-1-2 1.5-4-2-4-3.5 0-4 2-5 4-1 2-1.5 2.5-2.5 4zm14.5 4c1.5 0 2.5 2 2.5 4-1.5 1.5-2 2.5-2.5 4-1-2 1.5-4-2-4s-3-2-4-4c-1-2-2.5-2-2.5-4 1.5-1.5 2-2.5 2.5-4 1-2-1.5-4 2-4z" /><path d="M11.5 30.5c5.5-3 15.5-3 21 0" fill="none" strokeLinecap="butt" /><path d="M11.5 34.5a35 35 1 0 0 21 0" fill="none" strokeLinecap="butt" /></g></svg>);
const RookClassic: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5H14V17" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M14 17h17" fill="none" /></g></svg>);
const BishopClassic: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2-4.452.973-10.223-.496-13.5-2.973-3.277 2.477-9.048 3.946-13.5 2.973z" /><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" /><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" /></g></svg>);
const KnightClassic: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c-2 0-9-1.5-8.5-10.5 1-7 9.5-10.5 9.5-10.5l-1.5-2.5s-1-1.5-1.5-4c-.5-2.5 1.5-3 1.5-3l1-2c-.5-1-1-1.5-1-2.5-.5-1-1-2.5-1-2.5s2 1.5 2.5 3c.5 1.5 1 2 1 2.5 1 1.5 1 2 .5 3.5 0 0 0 1 1 1z" /><path d="M24.5 25.5s-1.5-2-3-2-3 2-3 2" fill="none" /><path d="M9.5 24.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" fill="var(--piece-white)" stroke="var(--piece-white)" /></g></svg>);
const PawnClassic: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4zm0 9.5c-4.5 0-7.5 2.5-7.5 7.5v4h15v-4c0-5-3-7.5-7.5-7.5z" /><path d="M12 35.5h21v3H12v-3z" /></g></svg>);

// --- Geometric Piece Set ---
const KingGeometric: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 6 L14 19 L31 19 Z M22.5 18 L22.5 26 M18.5 22 L26.5 22" fill="none" /><path d="M12 39 L12 28 L33 28 L33 39 Z" /></g></svg>);
const QueenGeometric: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="22.5" cy="15" r="8" /><path d="M12 39 L12 25 L33 25 L33 39 Z" /></g></svg>);
const RookGeometric: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 39 L12 12 L33 12 L33 39 Z M12 12 H 33 V 8 H 28 V 12 H 17 V 8 H 12 V 12" /></g></svg>);
const BishopGeometric: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 9 L30 22 L22.5 39 L15 22 Z" /></g></svg>);
const KnightGeometric: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 39 L14 18 L26 18 L26 10 L32 10 L32 25 Z" /></g></svg>);
const PawnGeometric: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="22.5" cy="20" r="6" /><path d="M15 39 L15 28 L30 28 L30 39 Z" /></g></svg>);


type PieceComponent = React.FC<{ className?: string }>;
type PieceSetMap = { [key in PieceType]: PieceComponent };

export const PIECE_SETS: { [key: string]: PieceSetMap } = {
  classic: {
    [PieceType.KING]: KingClassic,
    [PieceType.QUEEN]: QueenClassic,
    [PieceType.ROOK]: RookClassic,
    [PieceType.BISHOP]: BishopClassic,
    [PieceType.KNIGHT]: KnightClassic,
    [PieceType.PAWN]: PawnClassic,
  },
  geometric: {
    [PieceType.KING]: KingGeometric,
    [PieceType.QUEEN]: QueenGeometric,
    [PieceType.ROOK]: RookGeometric,
    [PieceType.BISHOP]: BishopGeometric,
    [PieceType.KNIGHT]: KnightGeometric,
    [PieceType.PAWN]: PawnGeometric,
  },
};

export const PROMOTION_PIECES = [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT];
