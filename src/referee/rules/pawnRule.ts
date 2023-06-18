import { Piece, PieceType, Position, TeamType, samePosition } from "../../constants";
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

    const normalMove : Position ={x:pawn.position.x,y:pawn.position.y + pawnDirection };
    const specialMove : Position ={x:normalMove.x,y:normalMove.y + pawnDirection };
    const upperLeftAttack: Position = {x: pawn.position.x-1,y:pawn.position.y + pawnDirection };
    const upperRightAttack: Position = {x: pawn.position.x+1,y:pawn.position.y + pawnDirection };
    const leftPosition: Position = {x: pawn.position.x-1,y:pawn.position.y};
    const rightPosition: Position = {x: pawn.position.x+1,y:pawn.position.y};

    if(!tileIsOccupied(normalMove, boardState)){
        possibleMoves.push(normalMove);
        if(pawn.position.y === specialRow && !tileIsOccupied(specialMove, boardState)){
            possibleMoves.push(specialMove);
        }
        
    }
    if(tileIsOccupiedByOpponent(upperLeftAttack,boardState, pawn.team)){
        possibleMoves.push(upperLeftAttack);
    }else if(!tileIsOccupied(upperLeftAttack, boardState)){
        const leftPiece = boardState.find(p=> samePosition(p.position,leftPosition));
        if(leftPiece != null && leftPiece.type === PieceType.PAWN && leftPiece.enpassant){
            possibleMoves.push(upperLeftAttack);
        }
    }
    if(tileIsOccupiedByOpponent(upperRightAttack,boardState, pawn.team)){
        possibleMoves.push(upperRightAttack);
    }else if(!tileIsOccupied(upperRightAttack, boardState)){
        const rightPiece = boardState.find(p=> samePosition(p.position,rightPosition));
        if(rightPiece != null && rightPiece.type === PieceType.PAWN && rightPiece.enpassant){
            possibleMoves.push(upperRightAttack);
        }
    }
    return possibleMoves;
}