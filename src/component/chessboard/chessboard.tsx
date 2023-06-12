import React, { useRef, useState } from 'react';
import './chessboard.css';
import Tile from '../tile/tile'
import Refree from "../../referee/refree";
import { PieceType, TeamType , Piece, initialBoardState ,Position, GRID_SIZE, samePosition} from '../../constants';

export default function Chessboard() {
    const [grabPosition, setGrabPosition]=useState<Position>({x:-1,y:-1});
    const [activePiece, setActivePiece]=useState<HTMLElement | null >(null);
    const [pieces, setPieces]= useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null);
    const refree = new Refree();


    function movePiece(e: React.MouseEvent) {
        // const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;

        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft-25;
            const minY = chessboard.offsetTop- 23;
            const maxX = chessboard.offsetLeft+chessboard.clientWidth-75;
            const maxY = chessboard.offsetTop+chessboard.clientHeight-73;

            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";
            
            activePiece.style.left = (x < minX)?`${minX}px`:(x > maxX)?`${maxX}px`:`${x}px`;
            activePiece.style.top = (y < minY)?`${minY}px`:(y > maxY)?`${maxY}px`:`${y}px`;
        }
    }

    function grabPiece(e: React.MouseEvent) {
        // console.log(e.target);
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;

        if (element.classList.contains('chess-piece') && chessboard) {
            // console.log(e.target);
            const gX = Math.floor((e.clientX - chessboard.offsetLeft)/ GRID_SIZE);
            const gY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/ GRID_SIZE));
            setGrabPosition({x: gX, y: gY});

            const x = e.clientX - GRID_SIZE/2;
            const y = e.clientY - GRID_SIZE/2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }
    function placePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        
        if (activePiece && chessboard ) {
            const x= Math.floor((e.clientX - chessboard.offsetLeft)/ GRID_SIZE);
            const y= Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/ GRID_SIZE));

            const currentPiece = pieces.find(p => samePosition(p.position, grabPosition));
           
            //reassigning the new locations to the chess pieces after the move
            // the currentPiece(x,y) changes over each iter, making the white pawns to respawn over black over the reduce function
            if(currentPiece){
                const validMove = refree.isValidMove(grabPosition, {x, y}, currentPiece.type, currentPiece.team,pieces);

                const isEnPassant = refree.isEnPassantMove(grabPosition, {x, y}, currentPiece.type, currentPiece.team,pieces);
                //TODO: WE CAN REDUCE THIS REPETITION OF PROPERTIES USING REDUX STATE... RN IT'S 80-20


                if(isEnPassant){
                    const pieceDirection = (currentPiece.team === TeamType.WHITE)?1 : -1;
                    const updatedPieces = pieces.reduce((result, piece)=> {
                        if(piece.position.x === grabPosition.x && piece.position.y === grabPosition.y){
                            piece.position.x = x;
                            piece.position.y = y;
                            result.push(piece);
                            piece.enpassant = false;
                        }else if(!(samePosition(piece.position,{x, y: y - pieceDirection}))){
                            if(piece.type === PieceType.PAWN){
                                piece.enpassant = false;
                            }
                            result.push(piece);
                        }
                        return result;

                    },[] as Piece[]);

                    setPieces(updatedPieces);
                }else if(validMove){
                //UPDATING OUT PIECES , remove the attecked piece too
                const updatedPieces = pieces.reduce((results, piece)=>{
                    if(samePosition(piece.position, grabPosition)){
                        //SPECIAL ROW MOVEMENT
                        piece.enpassant = Math.abs(grabPosition.y - y)=== 2 && piece.type === PieceType.PAWN;
    
                        piece.position.x = x;
                        piece.position.y = y;
                        results.push(piece);
                    }else if(!(samePosition(piece.position, {x,y}))){
                        if(piece.type === PieceType.PAWN){
                            piece.enpassant = false;
                        }
                        results.push(piece);
                    }
                    return results;
                },[] as Piece[]);

                setPieces(updatedPieces);
                //dont set it via a value like ->  setPieces((value)=> updatedPieces);

                }else{
                    //reseting the piece position <invalid move>
                    activePiece.style.position= "relative";
                    activePiece.style.removeProperty("top");
                    activePiece.style.removeProperty("left");
                }
            }
            setActivePiece(null);
        }
    }
    let board = [];

    for (let j = 7; j >= 0; j--) {//vertical
        for (let i = 0; i < 8; i++) {//horizontal
            let no = i + j + 2;
            const piece = pieces.find(p=>samePosition(p.position, {x:i,y:j}));
            let image = piece ? piece.image : undefined;//not null here 
    
            board.push(<Tile key={`${j},${i}`} no={no} i={i} j={j} image={image} />);

        }
    }
    return (
        <div
            onMouseMove={e => movePiece(e)}
            onMouseDown={e => grabPiece(e)}
            onMouseUp={e => placePiece(e)}
            ref={chessboardRef}
            id='chessboard'>
            {board}
        </div>
    )
}


