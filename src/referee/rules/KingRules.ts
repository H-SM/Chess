import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const kingMove = (initialPosition: Position, finalPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
  let multiplierX = (initialPosition.x > finalPosition.x)? -1: (initialPosition.x === finalPosition.x)? 0 : 1;
  let multiplierY = (initialPosition.y > finalPosition.y)? -1: (initialPosition.y === finalPosition.y)? 0 : 1;
  let passedPosition : Position = { x : initialPosition.x + multiplierX, y: initialPosition.y + multiplierY};
  if(samePosition(passedPosition, finalPosition)){
      if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
          return true;
      }
  }
  return false;
  }

  export const getPossibleKingMoves = (king: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 1; i < 2; i++) {
      const destination: Position = {x: king.position.x, y: king.position.y + i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom movement
    for(let i = 1; i < 2; i++) {
      const destination: Position = {x: king.position.x, y: king.position.y - i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Left movement
    for(let i = 1; i < 2; i++) {
      const destination: Position = {x: king.position.x - i, y: king.position.y};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Right movement
    for(let i = 1; i < 2; i++) {
      const destination: Position = {x: king.position.x + i, y: king.position.y};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Upper right movement
    for(let i = 1; i < 2; i++) {
      const destination: Position = {x: king.position.x + i, y: king.position.y + i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom right movement
    for(let i = 1; i < 2; i++) {
      const destination: Position = {x: king.position.x + i, y: king.position.y - i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom left movement
    for(let i = 1; i < 2; i++) {
      const destination: Position = {x: king.position.x - i, y: king.position.y - i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Top left movement
    for(let i = 1; i < 2; i++) {
      const destination: Position = {x: king.position.x - i, y: king.position.y + i};

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    return possibleMoves;
  }