
import React from 'react';
import { PieceType, Color } from './types';

const King: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.63V6M20 8h5" fill="none" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-3-3-3s-3 3-3 3c-1.5 3 3 10.5 3 10.5" fill="currentColor" stroke="currentColor" />
      <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s-2 1.5-5.5 1.5s-5-1.5-5.5-1.5s-5.5 1.5-5.5 1.5z" fill="currentColor" />
      <path d="M11.5 30c5.5-3 15.5-3 21 0m-21-4.5c5.5 3 15.5 3 21 0" fill="none" />
      <path d="M11.5 37a35 35 1 0 0 21 0" fill="currentColor" />
      <path d="M11.5 30c5.5-3 15.5-3 21 0" fill="none" />
      <path d="M11.5 25.5c5.5 3 15.5 3 21 0" fill="none" />
    </g>
  </svg>
);

const Queen: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm11.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm11.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm11.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM22.5 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
      <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14l2 12z" stroke="currentColor" />
      <path d="M9 26c0 2 1.5 2 2 4 1 2-1 4 2.5 4 3 0 4-2 5-4 1-2 2.5-2 2.5-4-1.5-1.5-2-2.5-2.5-4-1-2 1.5-4-2-4-3.5 0-4 2-5 4-1 2-1.5 2.5-2.5 4zm14.5 4c1.5 0 2.5 2 2.5 4-1.5 1.5-2 2.5-2.5 4-1 2 1.5 4-2 4s-3-2-4-4c-1-2-2.5-2-2.5-4 1.5-1.5 2-2.5 2.5-4 1-2-1.5-4 2-4z" />
      <path d="M11.5 30.5c5.5-3 15.5-3 21 0" fill="none" strokeLinecap="butt" />
      <path d="M11.5 34.5a35 35 1 0 0 21 0" fill="none" strokeLinecap="butt" />
    </g>
  </svg>
);

const Rook: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke="currentColor" />
      <path d="M34 14l-3 3H14l-3-3" />
      <path d="M31 17v12.5H14V17" stroke="currentColor" />
      <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
      <path d="M14 17h17" fill="none" />
    </g>
  </svg>
);

const Bishop: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2-4.452.973-10.223-.496-13.5-2.973-3.277 2.477-9.048 3.946-13.5 2.973z" stroke="currentColor" />
      <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" stroke="currentColor" />
      <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M17.5 26.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm13 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#fff" />
    </g>
  </svg>
);

const Knight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c-2 0-9-1.5-8.5-10.5 1-7 9.5-10.5 9.5-10.5l-1.5-2.5s-1-1.5-1.5-4c-.5-2.5 1.5-3 1.5-3l1-2c-.5-1-1-1.5-1-2.5-.5-1-1-2.5-1-2.5s2 1.5 2.5 3c.5 1.5 1 2 1 2.5 1 1.5 1 2 .5 3.5 0 0 0 1 1 1z" stroke="currentColor" />
      <path d="M24.5 25.5s-1.5-2-3-2-3 2-3 2" fill="none" />
      <path d="M9.5 24.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" fill="#fff" stroke="#fff" />
    </g>
  </svg>
);

const Pawn: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4zm0 9.5c-4.5 0-7.5 2.5-7.5 7.5v4h15v-4c0-5-3-7.5-7.5-7.5z" stroke="currentColor" />
      <path d="M12 35.5h21v3H12v-3z" />
    </g>
  </svg>
);

export const PIECE_COMPONENTS: { [key in PieceType]: React.FC<{ className?: string }> } = {
  [PieceType.KING]: King,
  [PieceType.QUEEN]: Queen,
  [PieceType.ROOK]: Rook,
  [PieceType.BISHOP]: Bishop,
  [PieceType.KNIGHT]: Knight,
  [PieceType.PAWN]: Pawn,
};

export const PROMOTION_PIECES = [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT];
