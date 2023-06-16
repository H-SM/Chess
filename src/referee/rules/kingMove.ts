import { Piece, Position, TeamType, samePosition } from "../../constants";
import { tileIsEmptyOrOccupiedByOpponent } from "./generalRules";

export const kingMove = (initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean => {
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