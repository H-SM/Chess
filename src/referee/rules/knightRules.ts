import { Piece, Position, TeamType } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove = (initialPosition: Position, finalPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
  for(let i=-1;i<2;i+=2){
    //t/b
    for(let j=-1;j<2;j+=2){
        if(finalPosition.y - initialPosition.y === 2 * i){
            if(finalPosition.x - initialPosition.x === j){
                if(tileIsEmptyOrOccupiedByOpponent(finalPosition,boardState,team)){
                    return true; 
                }
            }
        }
        //l/r
        if(finalPosition.x - initialPosition.x === 2 * i){
            if(finalPosition.y - initialPosition.y === j){
                if(tileIsEmptyOrOccupiedByOpponent(finalPosition,boardState,team)){
                    return true; 
                }
            }
        }
    }
}
return false;
}

export const getPossibleKnightMoves = (knight: Piece, boardstate: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove: Position = { x: knight.position.x + j, y: knight.position.y + i * 2 };
      const horizontalMove: Position = { x: knight.position.x + i * 2, y: + knight.position.y + j };

      if(tileIsEmptyOrOccupiedByOpponent(verticalMove, boardstate, knight.team)) {
        possibleMoves.push(verticalMove);
      }

      if(tileIsEmptyOrOccupiedByOpponent(horizontalMove, boardstate, knight.team)) {
        possibleMoves.push(horizontalMove);
      }
    }
  }

  return possibleMoves;
}