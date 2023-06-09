import React, { useRef } from 'react';
import './chessboard.css';
import Tile from '../tile/tile'

interface Piece {
    image: string,
    x: number,
    y: number
}
//array of piece: of type Piece interface
const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "l";
    const y = (p === 0) ? 7 : 0;

    pieces.push({ image: `assests/images/rook_${type}.png`, x: 0, y });
    pieces.push({ image: `assests/images/rook_${type}.png`, x: 7, y });
    pieces.push({ image: `assests/images/horse_${type}.png`, x: 1, y });
    pieces.push({ image: `assests/images/horse_${type}.png`, x: 6, y });
    pieces.push({ image: `assests/images/bishop_${type}.png`, x: 2, y });
    pieces.push({ image: `assests/images/bishop_${type}.png`, x: 5, y });
    pieces.push({ image: `assests/images/queen_${type}.png`, x: 3, y });
    pieces.push({ image: `assests/images/king_${type}.png`, x: 4, y });
}
for (let i = 0; i < 8; i++) {
    pieces.push({ image: "assests/images/pawn_b.png", x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
    pieces.push({ image: "assests/images/pawn_l.png", x: i, y: 1 });
}

export default function Chessboard() {
    let board = [];
    let no = 0;
    const chessboardRef = useRef<HTMLDivElement>(null);

    let activePiece: HTMLElement | null = null;

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
        if (element.classList.contains('chess-piece')) {
            // console.log(e.target);
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            activePiece = element;
        }
    }
    function placePiece(e: React.MouseEvent) {
        if (activePiece) {
            activePiece = null;
        }
    }

    for (let j = 7; j >= 0; j--) {//vertical
        for (let i = 0; i < 8; i++) {//horizontal
            no = i + j + 2;
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


