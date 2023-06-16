import { Piece, Position, TeamType } from "../../constants";
import { tileIsEmptyOrOccupiedByOpponent } from "./generalRules";

export const horseMove =(initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean => {
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