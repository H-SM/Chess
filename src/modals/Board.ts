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
        //calculate the moves of all the pieces 
        for(const piece of this.pieces){
            piece.possibleMoves =this.getValidMoves(piece, this.pieces);
        }

        this.checkKingMoves();    
    }

    checkKingMoves(){
        const king = this.pieces.find(p => p.isKing && p.team === TeamType.BLACK);

        if(king?.possibleMoves === undefined)return;

        //simulate the king moves
        for(const move of king.possibleMoves){
            
            const simulatedBoard = this.clone();
            const pieceAtDestination = simulatedBoard.pieces.find(p => p.samePosition(move));

            if(pieceAtDestination !== undefined){
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));
            }
            const simulatedKing =  simulatedBoard.pieces.find(p => p.isKing && p.team=== TeamType.BLACK);
            // if(simulatedKing === undefined)continue; <--- looked over by "!"
            simulatedKing!.position = move;

            for(const enemy of simulatedBoard.pieces.filter(p => p.team === TeamType.WHITE)){
                enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);
            }

            let safe = true;

            //logic for the safe move
            for(const p of simulatedBoard.pieces){
                if(p.team === TeamType.BLACK) continue;
                if(p.isPawn){
                    const possibleMoves = simulatedBoard.getValidMoves(p, simulatedBoard.pieces);
                    if(possibleMoves?.some(ppm => ppm.samePosition(move) && ppm.x !== p.position.x)){
                        safe = false;
                        break;
                    }
                }else if(p.possibleMoves?.some(p => p.samePosition(move))){
                    safe = false;
                    break;
                }
            }
            if(!safe){
                //remove the move from possible moves
                king.possibleMoves = king.possibleMoves?.filter(m => !m.samePosition(move));
            }
        }   
    }
    playMove(enPassantMove:boolean,
        validMove: boolean,
        playedPiece: Piece,
        destination: Position
        ): boolean{
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
        return new Board(this.pieces.map(p => p.clone()));
    }

}