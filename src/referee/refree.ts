import { PieceType, TeamType } from '../component/chessboard/chessboard'

export default class refree {
    isValidMove(px : number, py : number, x : number, y : number, type: PieceType, team : TeamType){
        console.log(`Previous location: ${px}, ${py}\nNew location: ${x}, ${y}\nType: ${type}\nTeam: ${team}`);

        if(type === PieceType.PAWN){
            if(team === TeamType.WHITE){
                if(py=== 1){
                    if(px=== x && (y- py === 1 || y- py === 2 )){
                        console.log("refree say's its valid... ");
                        return true;
                    }
                }else if(py!== 1){
                    if(px=== x && y- py === 1){
                        console.log("refree say's its valid... ");
                        return true;
                    }
                }
            }
        }
        console.log("refree say's its <<not>> valid... ");
        return false;
    }
}