import { TeamType } from "../../Types";
import { Piece, Position } from "../../modals";
import { Pawn } from "../../modals/Pawn";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const getPossiblePawnMoves = (pawn: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];
  const specialRow = pawn.team === TeamType.WHITE ? 1 : 6;
  const pawnDirection = pawn.team === TeamType.WHITE ? 1 : -1;

  const normalMove = new Position(pawn.position.x, pawn.position.y + pawnDirection);
  const specialMove = new Position(normalMove.x, normalMove.y + pawnDirection);
  const upperLeftAttack = new Position(pawn.position.x - 1, pawn.position.y + pawnDirection);
  const upperRightAttack = new Position(pawn.position.x + 1, pawn.position.y + pawnDirection);
  const leftPosition = new Position(pawn.position.x - 1, pawn.position.y);
  const rightPosition = new Position(pawn.position.x + 1, pawn.position.y);

  if (!tileIsOccupied(normalMove, boardState)) {
    possibleMoves.push(normalMove);
    if (pawn.position.y === specialRow &&
      !tileIsOccupied(specialMove, boardState)) {
      possibleMoves.push(specialMove)
    }
  }
  if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
    possibleMoves.push(upperLeftAttack);
  } else if (!tileIsOccupied(upperLeftAttack, boardState)) {
    const leftPiece = boardState.find(p => p.samePosition(leftPosition));
    if (leftPiece != null && (leftPiece as Pawn).enPassant) {
      possibleMoves.push(upperLeftAttack);
    }
  }
  if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
    possibleMoves.push(upperRightAttack);
  } else if (!tileIsOccupied(upperRightAttack, boardState)) {
    const rightPiece = boardState.find(p => p.samePosition( rightPosition));
    if (rightPiece != null && (rightPiece as Pawn).enPassant) {
      possibleMoves.push(upperRightAttack);
    }
  }
  return possibleMoves;
}