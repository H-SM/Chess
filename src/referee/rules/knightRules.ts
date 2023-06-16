import { Piece, Position, TeamType, samePosition } from "../../constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent} from "./generalRules";

export const bishopMove =(initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean => {
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