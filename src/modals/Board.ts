import { PieceType, TeamType } from "../Types";
import { getCastlingMoves, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../referee/rules";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board { 
    pieces: Piece[];
    totalTurns : number;
    winningTeam?: TeamType ;

    constructor(pieces :Piece[], totalTurns : number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    calculateAllMove() {
        //calculate the moves of all the pieces 
        for(const piece of this.pieces){
            piece.possibleMoves =this.getValidMoves(piece, this.pieces);
        }

        //calculating castling moves
        for(const king of this.pieces.filter(p => p.isKing )){
            if(king.possibleMoves === undefined)continue;
            king.possibleMoves = [...king.possibleMoves,...getCastlingMoves(king, this.pieces)];
        }
        //check if current piece moves are valid over any checkmate over the king
        this.checkCurrentTeamMoves();
        
        //remove the possible moves for the team that's not playing in the current state 
        for(const piece of this.pieces.filter(p=> p.team !== this.currentTeam)){
            piece.possibleMoves =[];
        }

        //check if the playing team still have some moves , else its a checkmate 
        if(this.pieces.filter(p => p.team === this.currentTeam).some(p => p.possibleMoves !== undefined && p.possibleMoves.length > 0))return;

        this.winningTeam = (this.currentTeam === TeamType.WHITE) ? TeamType.BLACK : TeamType.WHITE;
    }
    get currentTeam():TeamType{
        return (this.totalTurns % 2 === 0)?TeamType.BLACK: TeamType.WHITE;
    }

    checkCurrentTeamMoves(){
        //loop through all the current team pieces 
        for(const peice of this.pieces.filter(p=> p.team === this.currentTeam)){
            if(peice.possibleMoves === undefined)continue;
            //simulate all teh piece moves 
            for(const move of peice.possibleMoves){
                const simulatedBoard = this.clone();

                //possible way to remove the checkmating piece over the king via move from any other random piece
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));  

                const clonedPiece = simulatedBoard.pieces.find(p => p.samePiecePosition(peice))!;
                clonedPiece.position = move.clone();

                const clonedKing =  simulatedBoard.pieces.find(p => p.isKing && p.team === simulatedBoard.currentTeam)!;

                for(const enemy of simulatedBoard.pieces.filter(p => p.team !== simulatedBoard.currentTeam)){
                    enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);

                    if(enemy.isPawn){
                        if(enemy.possibleMoves.some(m => m.x !== enemy.position.x && m.samePosition(clonedKing.position))){
                            peice.possibleMoves = peice.possibleMoves.filter(p => !p.samePosition(move));
                        }
                    } else{
                        if(enemy.possibleMoves.some(m => m.samePosition(clonedKing.position))){
                            peice.possibleMoves = peice.possibleMoves.filter(p => !p.samePosition(move));
                        }
                    }
                }
            }
        }
    }
    playMove(enPassantMove:boolean,
        validMove: boolean,
        playedPiece: Piece,
        destination: Position
        ): boolean{
        const pawnDirection = playedPiece.team === TeamType.WHITE ? 1 : -1;
        const destinationPiece = this.pieces.find(p => p.samePosition(destination));

        //castling move 
        if(playedPiece.isKing && destinationPiece?.isRook && destinationPiece.team === playedPiece.team){
            const direction = (destinationPiece.position.x - playedPiece.position.x > 0)? 1: -1;    
            const newKingPosition = playedPiece.position.x + direction*2;
            // weuse map as there is no change over the count of the pieces in the board over castling
            this.pieces =this.pieces.map(p => {
                if(p.samePiecePosition(playedPiece)){
                    p.position.x = newKingPosition;
                }else if(p.samePiecePosition(destinationPiece)){
                    p.position.x = newKingPosition - direction;
                }
                return p;
            });

            this.calculateAllMove();
            return true;
        }
        
        if (enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    if(piece.isPawn){
                    (piece as Pawn).enPassant = false;
                    }
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    piece.hasMoved = true;
                    results.push(piece);
                } else if (!piece.samePosition(new Position(destination.x, destination.y - pawnDirection))) {
                    if(piece.isPawn){
                        (piece as Pawn).enPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);

            this.calculateAllMove();
        } else if (validMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    //SPECIAL MOVE
                    if(piece.isPawn){
                        (piece as Pawn).enPassant =
                        Math.abs(playedPiece.position.y - destination.y) === 2;
                    }
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    piece.hasMoved = true;
                    results.push(piece);
                } else if (!piece.samePosition( new Position(destination.x, destination.y ))) {
                    if(piece.isPawn){
                        (piece as Pawn).enPassant = false;
                    }
                    results.push(piece);
                }

                return results;
            }, [] as Piece[]);
            
            this.calculateAllMove();
           
        } else {
            return false;
        }
        return true;
    }

    getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
        switch (piece.type) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, boardState);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, boardState);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, boardState);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, boardState);
            case PieceType.KING:
                return getPossibleKingMoves(piece, boardState);
            default:
                return [];
        }
    }
    //CLONING THE OBJECT OF THE BOARD 
    clone():Board {
        return new Board(this.pieces.map(p => p.clone()), this.totalTurns);
    }

}