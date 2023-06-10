import { PieceType, TeamType , Piece} from '../component/chessboard/chessboard'

export default class refree {
    tileIsOccupied(x : number,y : number, boardState : Piece[]): boolean {
        console.log("i am the tile checker");
        const piece = boardState.find(p => p.x === x && p.y === y)
        if(piece){
            return true;
        }else{
            return false;
        }
    }
    isValidMove(px : number, py : number, x : number, y : number, type: PieceType, team : TeamType, boardState : Piece[]){
        // console.log(`Previous location: ${px}, ${py}\nNew location: ${x}, ${y}\nType: ${type}\nTeam: ${team}`);

        if(type === PieceType.PAWN){
            const specialRow = (team === TeamType.WHITE)? 1 : 6;
            const pawnDirection = (team === TeamType.WHITE)?1 : -1;

            if(py === specialRow && y-py === 2*(pawnDirection)){
                if(px=== x &&  y-py === 2*(pawnDirection)){
                    if(!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,y-pawnDirection,boardState) ){
                        return true;
                    }
                }
            }else{
                if(px===x && y-py === pawnDirection){
                    if(!this.tileIsOccupied(x,y,boardState)){
                        return true;
                    }
                }
            }
        }

        console.log("<<not>> ");
        return false;
    }
}