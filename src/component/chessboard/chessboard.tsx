import React, { useRef, useState } from 'react';
import './chessboard.css';
import Tile from '../tile/tile'
import Refree from "../../referee/refree";

export interface Piece {
    image: string,
    x: number,
    y: number,
    type : PieceType,
    team : TeamType,
    enpassant ?: boolean,
}

export enum PieceType {
    PAWN,
    BISHOP,
    HORSE,
    ROOK,
    QUEEN, 
    KING
}
export enum TeamType {
    WHITE,
    BLACK
}

const initialBoardState: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const teamtype = (p===0)? TeamType.BLACK:TeamType.WHITE; 
    const type = (p === 0) ? "b" : "l";
    const y = (p === 0) ? 7 : 0;

    initialBoardState.push({ image: `assests/images/rook_${type}.png`, x: 0, y , type : PieceType.ROOK, team : teamtype});
    initialBoardState.push({ image: `assests/images/rook_${type}.png`, x: 7, y , type : PieceType.ROOK, team : teamtype});
    initialBoardState.push({ image: `assests/images/horse_${type}.png`, x: 1, y , type : PieceType.HORSE, team : teamtype});
    initialBoardState.push({ image: `assests/images/horse_${type}.png`, x: 6, y , type : PieceType.HORSE, team : teamtype});
    initialBoardState.push({ image: `assests/images/bishop_${type}.png`, x: 2, y , type : PieceType.BISHOP, team : teamtype});
    initialBoardState.push({ image: `assests/images/bishop_${type}.png`, x: 5, y , type : PieceType.BISHOP, team : teamtype});
    initialBoardState.push({ image: `assests/images/queen_${type}.png`, x: 3, y , type : PieceType.QUEEN, team : teamtype});
    initialBoardState.push({ image: `assests/images/king_${type}.png`, x: 4, y , type : PieceType.KING, team : teamtype});
}
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "assests/images/pawn_b.png", x: i, y: 6 , type : PieceType.PAWN, team : TeamType.BLACK});
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "assests/images/pawn_l.png", x: i, y: 1 , type : PieceType.PAWN, team : TeamType.WHITE});
}

export default function Chessboard() {
    const [gridX,setGridX]=useState(0);
    const [gridY,setGridY]=useState(0);
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
    
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft)/ 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/ 100)));

            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }
    function placePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        
        if (activePiece && chessboard ) {
            const x= Math.floor((e.clientX - chessboard.offsetLeft)/ 100);
            const y= Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/ 100));

            const currentPiece = pieces.find(p => p.x === gridX && p.y === gridY);
           
            //reassigning the new locations to the chess pieces after the move
            // the currentPiece(x,y) changes over each iter, making the white pawns to respawn over black over the reduce function
            if(currentPiece){
                const validMove = refree.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team,pieces);

                const isEnPassant = refree.isEnPassantMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team,pieces);

                if(isEnPassant){
                    const pieceDirection = (currentPiece.team === TeamType.WHITE)?1 : -1;
                    const updatedPieces = pieces.reduce((result, piece)=> {
                        if(piece.x === gridX && piece.y === gridY){
                            piece.x = x;
                            piece.y = y;
                            result.push(piece);
                            piece.enpassant = false;
                        }else if(!(piece.x === x && piece.y === y - pieceDirection)){
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
                    if(piece.x === gridX && piece.y === gridY){
                        if(Math.abs(gridY - y)=== 2 && piece.type === PieceType.PAWN){
                            //SPECIAL MOVE OF PAWN
                            piece.enpassant = true;
                        }else{
                            piece.enpassant = false;
                        }
                        piece.x=x;
                        piece.y=y;
                        results.push(piece);
                    }else if(!(piece.x === x && piece.y === y)){
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
            let image = undefined;//not null here 

            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image;
                }
            })
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


