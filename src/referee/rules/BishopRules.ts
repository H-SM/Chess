import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const bishopMove = (initialPosition: Position, finalPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
  if(Math.abs(finalPosition.x-initialPosition.x) === Math.abs(finalPosition.y - initialPosition.y)){
    let multiplierX = (initialPosition.x > finalPosition.x)? -1:1;
    let multiplierY = (initialPosition.y > finalPosition.y)? -1:1;
    let iMax = (multiplierY === 1)?(finalPosition.y - initialPosition.y + 1):(initialPosition.y - finalPosition.y + 1);
    for(let i=1; i<iMax;i++){
        let passedPosition : Position = { x : initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY)};
          
        if(samePosition(passedPosition, finalPosition)){
            if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
            return true;
            }
        }
        if(tileIsOccupied(passedPosition, boardState)){
                return false;
            }
        }
}
return false;
  }

  export const getPossibleBishopMoves = (bishop: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Upper right movement
    for(let i = 1; i < 8; i++) {
      const destination: Position = {x: bishop.position.x + i, y: bishop.position.y + i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, bishop.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom right movement
    for(let i = 1; i < 8; i++) {
      const destination: Position = {x: bishop.position.x + i, y: bishop.position.y - i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, bishop.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom left movement
    for(let i = 1; i < 8; i++) {
      const destination: Position = {x: bishop.position.x - i, y: bishop.position.y - i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, bishop.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Top left movement
    for(let i = 1; i < 8; i++) {
      const destination: Position = {x: bishop.position.x - i, y: bishop.position.y + i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, bishop.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    return possibleMoves;
  }