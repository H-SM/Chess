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

    pawnMove(initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean{
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
            return false;
    }

    horseMove(initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean{
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
        return false;
    }

    rookMove(initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean{
        //TODO: try improving the rook logic similar way as the bishop's
        if(initialPosition.x === finalPosition.x){
            //vertical line
            for(let i=1; i<8;i++){
                let director = (initialPosition.y > finalPosition.y)? -1:1;
                let passedPosition : Position = { x : initialPosition.x , y: initialPosition.y + (director * i)};
                if(samePosition(passedPosition, finalPosition)){
                    if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                    return true;
                    }
                }
                if(this.tileIsOccupied(passedPosition, boardState)){
                        return false;
                    }
            }
        }else if(initialPosition.y === finalPosition.y){
            //horizontal line
            for(let i=1; i<8;i++){
                let director = (initialPosition.x > finalPosition.x)? -1:1;
                let passedPosition : Position = { x : initialPosition.x + ( director * i), y: initialPosition.y };
                if(samePosition(passedPosition, finalPosition)){
                    if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                    return true;
                    }
                }
                if(this.tileIsOccupied(passedPosition, boardState)){
                        return false;
                    }
            }
        }
        return false;
    }

    bishopMove(initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean{
        if(Math.abs(finalPosition.x-initialPosition.x) === Math.abs(finalPosition.y - initialPosition.y)){
            let multiplierX = (initialPosition.x > finalPosition.x)? -1:1;
            let multiplierY = (initialPosition.y > finalPosition.y)? -1:1;
            let iMax = (multiplierY === 1)?(finalPosition.y - initialPosition.y + 1):(initialPosition.y - finalPosition.y + 1);
            for(let i=1; i<iMax;i++){
                let passedPosition : Position = { x : initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY)};
                  
                if(samePosition(passedPosition, finalPosition)){
                    if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                    return true;
                    }
                }
                if(this.tileIsOccupied(passedPosition, boardState)){
                        return false;
                    }
                }
        }
        return false;
    }

    queenMove(initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean{
        if(this.bishopMove(initialPosition,finalPosition,team, boardState)){
            return true;
        }else if(this.rookMove(initialPosition,finalPosition,team, boardState)){
            return true;
        }else 
        return false;
    }

    kingMove(initialPosition : Position, finalPosition : Position, team : TeamType, boardState : Piece[]): boolean{
        let multiplierX = (initialPosition.x > finalPosition.x)? -1: (initialPosition.x === finalPosition.x)? 0 : 1;
        let multiplierY = (initialPosition.y > finalPosition.y)? -1: (initialPosition.y === finalPosition.y)? 0 : 1;

        let passedPosition : Position = { x : initialPosition.x + multiplierX, y: initialPosition.y + multiplierY};
                  
        if(samePosition(passedPosition, finalPosition)){
            if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                return true;
            }
        }
        return false;
    }

    isValidMove(initialPosition : Position, finalPosition : Position, type: PieceType, team : TeamType, boardState : Piece[]){
        // console.log(`Previous location: ${px}, ${py}\nNew location: ${x}, ${y}\nType: ${type}\nTeam: ${team}`);
        let validMove = false;
        switch(type){
            case  PieceType.PAWN: 
                validMove = this.pawnMove(initialPosition,finalPosition,team, boardState);
                break;
            case  PieceType.HORSE: 
                validMove = this.horseMove(initialPosition,finalPosition,team, boardState);
                break;
            
            case  PieceType.ROOK: 
                validMove = this.rookMove(initialPosition,finalPosition,team, boardState);
                break;
            
            case  PieceType.BISHOP: 
                validMove = this.bishopMove(initialPosition,finalPosition,team, boardState);
                break;
            
            case  PieceType.QUEEN: 
                validMove = this.queenMove(initialPosition,finalPosition,team, boardState);
                break;   
            
            case  PieceType.KING: 
                validMove = this.kingMove(initialPosition,finalPosition,team, boardState);
                break; 
        }
        return validMove;
    }
}