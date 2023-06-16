import { PieceType, TeamType , Piece, Position } from '../constants';
import { pawnMove , kingMove, rookMove, horseMove, bishopMove, queenMove } from './rules';

export default class refree { 

    isEnPassantMove(initialPosition : Position, finalPosition : Position,type: PieceType,team: TeamType, boardState:Piece[] ){

        if(type === PieceType.PAWN){
            const pieceDirection = (team === TeamType.WHITE)?1 : -1;
            if((finalPosition.x- initialPosition.x === -1 || finalPosition.x- initialPosition.x === 1) && finalPosition.y-initialPosition.y === pieceDirection){
                const piece = boardState.find(p => p.position.x === finalPosition.x && p.position.y === finalPosition.y - pieceDirection && p.enpassant);
                if(piece){
                return true;
                }
            }
        }
        return false;
    }

    isValidMove(initialPosition : Position, finalPosition : Position, type: PieceType, team : TeamType, boardState : Piece[]){
        // console.log(`Previous location: ${px}, ${py}\nNew location: ${x}, ${y}\nType: ${type}\nTeam: ${team}`);
        let validMove = false;
        switch(type){
            case  PieceType.PAWN: 
                validMove = pawnMove(initialPosition,finalPosition,team, boardState);
                break;
            case  PieceType.HORSE: 
                validMove = horseMove(initialPosition,finalPosition,team, boardState);
                break;
            
            case  PieceType.ROOK: 
                validMove = rookMove(initialPosition,finalPosition,team, boardState);
                break;
            
            case  PieceType.BISHOP: 
                validMove = bishopMove(initialPosition,finalPosition,team, boardState);
                break;
            
            case  PieceType.QUEEN: 
                validMove = queenMove(initialPosition,finalPosition,team, boardState);
                break;   
            
            case  PieceType.KING: 
                validMove = kingMove(initialPosition,finalPosition,team, boardState);
                break; 
        }
        return validMove;
    }
}