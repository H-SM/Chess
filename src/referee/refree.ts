import { PieceType, TeamType , Piece, Position, samePosition} from '../constants';

export default class refree {
    tileIsEmptyOrOccupiedByOpponent(position : Position, boardState : Piece[], team : TeamType): boolean{
    return (!this.tileIsOccupied(position, boardState) || this.tileIsOccupiedByOpponent(position,boardState,team));
    }

    tileIsOccupied(position : Position, boardState : Piece[]): boolean {
        const piece = boardState.find(p => samePosition(p.position, position));
        if(piece){
            return true;
        }else{
            return false;
        }
    }

    tileIsOccupiedByOpponent(position : Position, boardState : Piece[], team : TeamType): boolean {
        const piece = boardState.find(p=> samePosition(p.position, position) && p.team !== team);
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
                    if(!this.tileIsOccupied(finalPosition,boardState) && !this.tileIsOccupied({x:finalPosition.x,y:finalPosition.y-pawnDirection},boardState) ){
                        return true;
                    }
                }
            }else if(initialPosition.x===finalPosition.x && finalPosition.y-initialPosition.y === pawnDirection){
                    if(!this.tileIsOccupied(finalPosition,boardState)){
                        return true;
                    }
            }
            //THE PAWN LOGIC - attack
            else if(finalPosition.x- initialPosition.x === -1 && finalPosition.y-initialPosition.y === pawnDirection){
                //attack in upper left or bottom left corner
                if(this.tileIsOccupiedByOpponent(finalPosition,boardState,team)){
                   return true;
                }
            }else if(finalPosition.x- initialPosition.x === 1 && finalPosition.y-initialPosition.y === pawnDirection){
                //attack in upper right or bottom right corner
                if(this.tileIsOccupiedByOpponent(finalPosition,boardState,team)){
                    return true;
                }
            }

        }else if(type === PieceType.HORSE ){
            for(let i=-1;i<2;i+=2){
                //t/b
                for(let j=-1;j<2;j+=2){
                    if(finalPosition.y - initialPosition.y === 2 * i){
                        if(finalPosition.x - initialPosition.x === j){
                            if(this.tileIsEmptyOrOccupiedByOpponent(finalPosition,boardState,team)){
                                return true; 
                            }
                        }
                    }
                    //l/r
                    if(finalPosition.x - initialPosition.x === 2 * i){
                        if(finalPosition.y - initialPosition.y === j){
                            if(this.tileIsEmptyOrOccupiedByOpponent(finalPosition,boardState,team)){
                                return true; 
                            }
                        }
                    }
                }
            }   
        }else if(type === PieceType.BISHOP ){
            //movement 
            //up right 
            if(Math.abs(finalPosition.x-initialPosition.x) === Math.abs(finalPosition.y - initialPosition.y)){
                    
                    if(finalPosition.x>initialPosition.x && finalPosition.y > initialPosition.y){
                        for(let i=1; i<Math.abs(finalPosition.y - initialPosition.y + 1);i++){
                        let passedPosition : Position = { x : initialPosition.x + i, y: initialPosition.y +i};
                        if(this.tileIsOccupied(passedPosition, boardState)){
                            console.log("1");
                            return false;
                            //illegal <piece in between>
                        }
                        }
                    }else if(finalPosition.x> initialPosition.x && finalPosition.y < initialPosition.y){
                        for(let i=1; i<Math.abs(finalPosition.y + initialPosition.y + 1);i++){
                        let passedPosition : Position = { x : initialPosition.x + i, y: initialPosition.y - i};
                            if(this.tileIsOccupied(passedPosition, boardState)){
                            console.log("2");
                            return false;
                            }
                        }
                    }
                    else if(finalPosition.x< initialPosition.x && finalPosition.y < initialPosition.y){
                        for(let i=1; i<Math.abs(finalPosition.y + initialPosition.y + 1);i++){
                        let passedPosition : Position = { x : initialPosition.x - i, y: initialPosition.y - i};
                            if(this.tileIsOccupied(passedPosition, boardState)){
                            console.log("3");
                            return false;
                            }
                        }
                    }
                    else if(finalPosition.x< initialPosition.x && finalPosition.y > initialPosition.y){
                        for(let i=1; i<Math.abs(finalPosition.y + initialPosition.y + 1);i++){
                        let passedPosition : Position = { x : initialPosition.x - i, y: initialPosition.y + i};
                            if(this.tileIsOccupied(passedPosition, boardState)){
                            console.log("4");
                            return false;
                            }
                        }
                    }
                return true;
            }
        }
        return false;
    }
}