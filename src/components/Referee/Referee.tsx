import { useRef, useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import { Piece, Position } from "../../modals";
import { PieceType, TeamType } from "../../Types";
import { Pawn } from "../../modals/Pawn";
import { initialBoard } from "../../Constants";
import { Board } from "../../modals/Board";

export default function Referee() {
    const [board, setBoard] = useState<Board>(initialBoard.clone());
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const modalRef = useRef<HTMLDivElement>(null);
    const checkmateModalRef = useRef<HTMLDivElement>(null);
    
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

        setBoard(() => {
            const clonedBoard = board.clone();
            clonedBoard.totalTurns += 1;

            playMoveIsValid = clonedBoard.playMove(enPassantMove, validMove, playedPiece,destination);

            if(clonedBoard.winningTeam !== undefined){
                checkmateModalRef.current?.classList.remove("hidden");
            }
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

    function restartGame(){
        checkmateModalRef.current?.classList.add("hidden");
        setBoard(initialBoard.clone());

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


    function promotePawn(pieceType: PieceType) {
        if (promotionPawn === undefined) {
            return;
        }
        //board is a state variable - we will use setBoard not board.piece
        setBoard((prevBoard)=> {
            const clonedBoard = board.clone();
            clonedBoard.pieces=  clonedBoard.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(promotionPawn)) {
                    results.push(new Piece(piece.position.clone(),pieceType, piece.team, true));
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
            <p style={{color: "white", fontSize :"20px", textAlign:"center"}}>Turn - {(board.totalTurns % 2 === 0)? "black": "white"}</p>
            <div className="modal hidden" ref={modalRef}>
                <div className="modal-body">
                    <img onClick={() => promotePawn(PieceType.ROOK)} src={`/assets/images/rook_${promotionTeamType()}.png`} alt=""/>
                    <img onClick={() => promotePawn(PieceType.BISHOP)} src={`/assets/images/bishop_${promotionTeamType()}.png`} alt=""/>
                    <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`/assets/images/knight_${promotionTeamType()}.png`} alt=""/>
                    <img onClick={() => promotePawn(PieceType.QUEEN)} src={`/assets/images/queen_${promotionTeamType()}.png`} alt=""/>
                </div>
            </div>
            <div className="modal hidden" ref={checkmateModalRef}>
                <div className="modal-body">
                    <div className="checkmate-body">
                    <span>The winning team is - {(board.winningTeam === TeamType.WHITE)? "WHITE": "BLACK"}!</span>
                    <button onClick={restartGame}>Play Again!</button>
                    </div>
                </div>
            </div>
            <Chessboard playMove={playMove}
                pieces={board.pieces} />
                <footer style={{color: "white", fontSize :"15px", textAlign:"center"}}>Made by @ HSM</footer>
        </>
    )
}