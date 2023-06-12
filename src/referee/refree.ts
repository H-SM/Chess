import { PieceType, TeamType , Piece, Position} from '../constants';

export default class refree {
    tileIsOccupied(x : number,y : number, boardState : Piece[]): boolean {
        const piece = boardState.find(p => p.position.x === x && p.position.y === y)
        if(piece){
            return true;
        }else{
            return false;
        }
    }
    tileIsOccupiedByOpponent(x: number, y: number, boardState : Piece[], team : TeamType): boolean {
        const piece = boardState.find(p=> p.position.x === x && p.position.y === y && p.team !== team);
        if(piece){
            return true;
        }else{
            return false;
        }
    }   
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

        if(type === PieceType.PAWN){
            //THE PAWN LOGIC - MOVEMENT
            const specialRow = (team === TeamType.WHITE)? 1 : 6;
            const pawnDirection = (team === TeamType.WHITE)?1 : -1;

            if(initialPosition.y === specialRow && finalPosition.y-initialPosition.y === 2*(pawnDirection)){
                if(initialPosition.x=== finalPosition.x &&  finalPosition.y-initialPosition.y === 2*(pawnDirection)){
                    if(!this.tileIsOccupied(finalPosition.x,finalPosition.y,boardState) && !this.tileIsOccupied(finalPosition.x,finalPosition.y-pawnDirection,boardState) ){
                        return true;
                    }
                }
            }else if(initialPosition.x===finalPosition.x && finalPosition.y-initialPosition.y === pawnDirection){
                    if(!this.tileIsOccupied(finalPosition.x,finalPosition.y,boardState)){
                        return true;
                    }
            }
            //THE PAWN LOGIC - attack
            else if(finalPosition.x- initialPosition.x === -1 && finalPosition.y-initialPosition.y === pawnDirection){
                //attack in upper left or bottom left corner
                if(this.tileIsOccupiedByOpponent(finalPosition.x,finalPosition.y,boardState,team)){
                   return true;
                }
            }else if(finalPosition.x- initialPosition.x === 1 && finalPosition.y-initialPosition.y === pawnDirection){
                //attack in upper right or bottom right corner
                if(this.tileIsOccupiedByOpponent(finalPosition.x,finalPosition.y,boardState,team)){
                    return true;
                }
            }

        }
        return false;
    }
}