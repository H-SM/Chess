import { Piece, Position, TeamType, samePosition } from "../../constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./generalRules";

export const rookMove = (initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean => {
    //TODO: try improving the rook logic similar way as the bishop's
    if(initialPosition.x === finalPosition.x){
        //vertical line
        for(let i=1; i<8;i++){
            let director = (initialPosition.y > finalPosition.y)? -1:1;
            let passedPosition : Position = { x : initialPosition.x , y: initialPosition.y + (director * i)};
            if(samePosition(passedPosition, finalPosition)){
                if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                return true;
                }
            }
            if(tileIsOccupied(passedPosition, boardState)){
                    return false;
                }
        }
    }else if(initialPosition.y === finalPosition.y){
        //horizontal line
        for(let i=1; i<8;i++){
            let director = (initialPosition.x > finalPosition.x)? -1:1;
            let passedPosition : Position = { x : initialPosition.x + ( director * i), y: initialPosition.y };
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