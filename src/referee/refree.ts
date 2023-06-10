import { PieceType, TeamType , Piece} from '../component/chessboard/chessboard'

export default class refree {
    tileIsOccupied(x : number,y : number, boardState : Piece[]): boolean {
        const piece = boardState.find(p => p.x === x && p.y === y)
        if(piece){
            return true;
        }else{
            return false;
        }
    }
    tileIsOccupiedByOpponent(x: number, y: number, boardState : Piece[], team : TeamType): boolean {
        const piece = boardState.find(p=> p.x === x && p.y === y && p.team !== team);
        if(piece){
            return true;
        }else{
            return false;
        }
    }   
    isValidMove(px : number, py : number, x : number, y : number, type: PieceType, team : TeamType, boardState : Piece[]){
        // console.log(`Previous location: ${px}, ${py}\nNew location: ${x}, ${y}\nType: ${type}\nTeam: ${team}`);

        if(type === PieceType.PAWN){
            //THE PAWN LOGIC - MOVEMENT
            const specialRow = (team === TeamType.WHITE)? 1 : 6;
            const pawnDirection = (team === TeamType.WHITE)?1 : -1;

            if(py === specialRow && y-py === 2*(pawnDirection)){
                if(px=== x &&  y-py === 2*(pawnDirection)){
                    if(!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,y-pawnDirection,boardState) ){
                        return true;
                    }
                }
            }else if(px===x && y-py === pawnDirection){
                    if(!this.tileIsOccupied(x,y,boardState)){
                        return true;
                    }
            }
            //THE PAWN LOGIC - attack
            else if(x- px === -1 && y-py === pawnDirection){
                //attack in upper left or bottom left corner
                console.log("upper left or bottom left");
                if(this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                   return true;
                }
            }else if(x- px === 1 && y-py === pawnDirection){
                //attack in upper right or bottom right corner
                if(this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                    return true;
                }
            }

        }
        return false;
    }
}