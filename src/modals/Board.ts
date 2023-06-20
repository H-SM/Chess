import { PieceType, TeamType } from "../Types";
import { getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../referee/rules";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board { 
    pieces: Piece[];
    constructor(pieces :Piece[]) {
        this.pieces = pieces;
    }
    calculateAllMove() {
        for(const piece of this.pieces){
            piece.possibleMoves =this.getValidMoves(piece, this.pieces);
        }
    }
    playMove(enPassantMove:boolean,validMove: boolean,playedPiece: Piece,destination: Position): boolean{
        const pawnDirection = playedPiece.team === TeamType.WHITE ? 1 : -1;
        if (enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    if(piece.isPawn){
                    (piece as Pawn).enPassant = false;
                    }
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    results.push(piece);
                } else if (!piece.samePosition(destination)) {
                    if(piece.isPawn){
                        (piece as Pawn).enPassant = false;
                    }
                    results.push(piece);
                }
                //the piece at the destination location wo'nt be pushed in the results


                return results;
            }, [] as Piece[]);

            this.calculateAllMove();
        } else if (validMove) {
            //UPDATES THE PIECE POSITION
            //AND IF A PIECE IS ATTACKED, REMOVES IT
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    //SPECIAL MOVE
                    if(piece.isPawn){
                        (piece as Pawn).enPassant =
                        Math.abs(playedPiece.position.y - destination.y) === 2;
                    }
                    //***************
                    //SINCE WE were having the white pieces to get above black after it was attacked is -> that we weren't creating new object , but using up reference type to that object whic altered the reference not the actual board object
                    //THIS WAS THE PROB MAKER > REF TO CHESSBOARD.TSX dropPiece() in this commit
                    //MAKE A COPY 
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
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
        // return this;
        return new Board(this.pieces.map(p => p.clone()));
    }

}