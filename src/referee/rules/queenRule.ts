import { Piece, Position, TeamType, samePosition } from "../../constants";
import { bishopMove } from "./knightRules";
import { rookMove } from "./rookRule";

export const queenMove = (initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean => {
    if(bishopMove(initialPosition,finalPosition,team, boardState)){
        return true;
    }else if(rookMove(initialPosition,finalPosition,team, boardState)){
        return true;
    }else 
    return false;
}
