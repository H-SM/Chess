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
export const getPossbleKingMoves= (king : Piece, boardState: Piece[]) : Position[]=> {
    const possibleMoves :Position[] = [];
    for(let i=-1;i<2;i++){
        for(let j=-1;j<2;j++){
            const verticalMove : Position = {x: king.position.x + j, y:king.position.y + i};
            const horizontalMove : Position = {x: king.position.x + i, y:king.position.y + j};
            if(tileIsEmptyOrOccupiedByOpponent(verticalMove,boardState,king.team)){
                possibleMoves.push(verticalMove);
            }
            if(tileIsEmptyOrOccupiedByOpponent(horizontalMove,boardState,king.team)){
                possibleMoves.push(horizontalMove);
            }
        }}
    return possibleMoves;
}