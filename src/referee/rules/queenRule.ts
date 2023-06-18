import { Piece, Position, TeamType } from "../../constants";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./generalRules";
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

export const getPossbleQueenMoves= (queen : Piece, boardState: Piece[]) : Position[]=> {
    const possibleMoves :Position[] = [];
    for(let i=1;i<8;i++){
        const destination: Position = {x: queen.position.x,y: queen.position.y-i};
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }else if(tileIsOccupiedByOpponent(destination,boardState, queen.team)){
            possibleMoves.push(destination);break; 
        }else{break;}
    }
    for(let i=1;i<8;i++){
        const destination: Position = {x: queen.position.x,y: queen.position.y+i};
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }else if(tileIsOccupiedByOpponent(destination,boardState, queen.team)){
            possibleMoves.push(destination);break; 
        }else{break;}
    }
    for(let i=1;i<8;i++){
        const destination: Position = {x: queen.position.x+i,y: queen.position.y};
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }else if(tileIsOccupiedByOpponent(destination,boardState, queen.team)){
            possibleMoves.push(destination);break; 
        }else{break;}
    }
    for(let i=1;i<8;i++){
        const destination: Position = {x: queen.position.x-i,y: queen.position.y};
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }else if(tileIsOccupiedByOpponent(destination,boardState, queen.team)){
            possibleMoves.push(destination);break; 
        }else{break;}
    }

    for(let i=1;i<8;i++){
        const destination: Position = {x: queen.position.x+i,y: queen.position.y+i};
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }else if(tileIsOccupiedByOpponent(destination,boardState, queen.team)){
            possibleMoves.push(destination);break; 
        }else{break;}
    }
    for(let i=1;i<8;i++){
        const destination: Position = {x: queen.position.x-i,y: queen.position.y+i};
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }else if(tileIsOccupiedByOpponent(destination,boardState, queen.team)){
            possibleMoves.push(destination);break; 
        }else{break;}
    }
    for(let i=1;i<8;i++){
        const destination: Position = {x: queen.position.x-i,y: queen.position.y-i};
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }else if(tileIsOccupiedByOpponent(destination,boardState, queen.team)){
            possibleMoves.push(destination);break; 
        }else{break;}
    }
    for(let i=1;i<8;i++){
        const destination: Position = {x: queen.position.x+i,y: queen.position.y-i};
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }else if(tileIsOccupiedByOpponent(destination,boardState, queen.team)){
            possibleMoves.push(destination);break; 
        }else{break;}
    }

    return possibleMoves;
}