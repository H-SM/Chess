import { Piece, Position, TeamType } from "../../constants";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./generalRules";

export const pawnMove = (initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean => {
    const specialRow = (team === TeamType.WHITE)? 1 : 6;
    const pawnDirection = (team === TeamType.WHITE)?1 : -1;
    if(initialPosition.y === specialRow && finalPosition.y-initialPosition.y === 2*(pawnDirection)){
        if(initialPosition.x=== finalPosition.x &&  finalPosition.y-initialPosition.y === 2*(pawnDirection)){
            if(!tileIsOccupied(finalPosition,boardState) && !tileIsOccupied({x:finalPosition.x,y:finalPosition.y-pawnDirection},boardState) ){
                return true;
            }
        }
    }else if(initialPosition.x===finalPosition.x && finalPosition.y-initialPosition.y === pawnDirection){
            if(!tileIsOccupied(finalPosition,boardState)){
                return true;
            }
    }
    //THE PAWN LOGIC - attack
    else if(finalPosition.x- initialPosition.x === -1 && finalPosition.y-initialPosition.y === pawnDirection){
        //attack in upper left or bottom left corner
        if(tileIsOccupiedByOpponent(finalPosition,boardState,team)){
           return true;
        }
    }else if(finalPosition.x- initialPosition.x === 1 && finalPosition.y-initialPosition.y === pawnDirection){
        //attack in upper right or bottom right corner
        if(tileIsOccupiedByOpponent(finalPosition,boardState,team)){
            return true;
        }
    }
    return false;
}

export const getPossblePawnMoves= (pawn : Piece, boardState: Piece[]) : Position[]=> {
    const possibleMoves :Position[] = [];
    const pawnDirection = (pawn.team === TeamType.WHITE)?1 : -1;
    const specialRow = (pawn.team === TeamType.WHITE)? 1 : 6;


    if(!tileIsOccupied({x:pawn.position.x,y:pawn.position.y + pawnDirection}, boardState)){
        possibleMoves.push({x:pawn.position.x,y:pawn.position.y + pawnDirection});
        if(pawn.position.y === specialRow && !tileIsOccupied({x:pawn.position.x,y:pawn.position.y + pawnDirection*2}, boardState)){
            possibleMoves.push({x:pawn.position.x,y:pawn.position.y + pawnDirection*2});
        }
        
    }
    return possibleMoves;
}