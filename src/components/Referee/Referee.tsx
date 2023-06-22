import { useEffect, useRef, useState } from "react";
import { bishopMove, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../../referee/rules";
import Chessboard from "../Chessboard/Chessboard";
import { Piece, Position } from "../../modals";
import { PieceType, TeamType } from "../../Types";
import { Pawn } from "../../modals/Pawn";
import { initialBoard } from "../../Constants";
import { Board } from "../../modals/Board";

export default function Referee() {
    const [board, setBoard] = useState<Board>(initialBoard);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        board.calculateAllMove();
    });
    
    function playMove(playedPiece: Piece, destination: Position): boolean {
        //snaping back to initial place if no move
        if(playedPiece.possibleMoves === undefined) return false;

        //prevent the inactive team to play there move until the opponent at the time to placec there move 
        if(playedPiece.team  === TeamType.WHITE && board.totalTurns % 2 !== 1 ){
            return false;
        }
        if(playedPiece.team  === TeamType.BLACK && board.totalTurns % 2 !== 0 ){
            return false;
        }

        let playMoveIsValid = false;


        const validMove = playedPiece.possibleMoves?.some(m => m.samePosition(destination));

        if(!validMove) return false;

        const enPassantMove = isEnPassantMove(
            playedPiece.position,
            destination,
            playedPiece.type,
            playedPiece.team
        );

        setBoard((prevBoard) => {
            const clonedBoard = board.clone();
            clonedBoard.totalTurns += 1;

            playMoveIsValid = clonedBoard.playMove(enPassantMove, validMove, playedPiece,destination);

            return clonedBoard;
        });
        let promotionRow = (playedPiece.team === TeamType.WHITE) ? 7 : 0;

        if (destination.y === promotionRow && playedPiece.isPawn) {
            modalRef.current?.classList.remove("hidden");
            setPromotionPawn((prevPromotionPosition)=> {
                const clonedPLayedPiece = playedPiece.clone();
                clonedPLayedPiece.position = destination.clone();
                return clonedPLayedPiece;
            });
        }
       
        return playMoveIsValid;
    }

    function isEnPassantMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: TeamType
    ) {
        const pawnDirection = team === TeamType.WHITE ? 1 : -1;

        if (type === PieceType.PAWN) {
            if (
                (desiredPosition.x - initialPosition.x === -1 ||
                    desiredPosition.x - initialPosition.x === 1) &&
                desiredPosition.y - initialPosition.y === pawnDirection
            ) {
                const piece = board.pieces.find(
                    (p) =>
                        p.position.x === desiredPosition.x &&
                        p.position.y === desiredPosition.y - pawnDirection 
                        && (p as Pawn).enPassant
                );
                if (piece) {
                    return true;
                }
            }
        }

        return false;
    }
    function isValidMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType) {
        let validMove = false;
        switch (type) {
            case PieceType.PAWN:
                validMove = pawnMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.KNIGHT:
                validMove = knightMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.BISHOP:
                validMove = bishopMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.ROOK:
                validMove = rookMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.QUEEN:
                validMove = queenMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.KING:
                validMove = kingMove(initialPosition, desiredPosition, team, board.pieces);
        }

        return validMove;
    }


    function promotePawn(pieceType: PieceType) {
        if (promotionPawn === undefined) {
            return;
        }
        //board is a state variable - we will use setBoard not board.piece
        setBoard((prevBoard)=> {
            const clonedBoard = board.clone();
            clonedBoard.pieces=  clonedBoard.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(promotionPawn)) {
                    results.push(new Piece(piece.position.clone(),pieceType, piece.team));
                } else { 
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);

            clonedBoard.calculateAllMove();
            return clonedBoard;
        })

        modalRef.current?.classList.add("hidden");
    }

    function promotionTeamType() {
        return (promotionPawn?.team === TeamType.WHITE) ? "w" : "b";
    }

    return (
        <>
            <p style={{color: "white", fontSize :"24px"}}>{board.totalTurns}</p>
            <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
                <div className="modal-body">
                    <img onClick={() => promotePawn(PieceType.ROOK)} src={`/assets/images/rook_${promotionTeamType()}.png`} alt=""/>
                    <img onClick={() => promotePawn(PieceType.BISHOP)} src={`/assets/images/bishop_${promotionTeamType()}.png`} alt=""/>
                    <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`/assets/images/knight_${promotionTeamType()}.png`} alt=""/>
                    <img onClick={() => promotePawn(PieceType.QUEEN)} src={`/assets/images/queen_${promotionTeamType()}.png`} alt=""/>
                </div>
            </div>
            <Chessboard playMove={playMove}
                pieces={board.pieces} />
        </>
    )
}