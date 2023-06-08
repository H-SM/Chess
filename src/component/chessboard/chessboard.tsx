import React from 'react';
import './chessboard.css';
import Tile from '../tile/tile'

interface Piece {
    image : string,
    x: number,
    y: number
}
//array of piece: of type Piece interface
const pieces: Piece[] = [];

for(let i=0 ;i<8;i++) {
    pieces.push({image: "assests/images/pawn_b.png", x:i, y:6 });
}

for(let i=0 ;i<8;i++) {
    pieces.push({image: "assests/images/pawn_l.png", x:i, y:1 });
}
pieces.push({image: "assests/images/rook_l.png", x:0, y:0 });
pieces.push({image: "assests/images/rook_l.png", x:7, y:0 });
pieces.push({image: "assests/images/horse_l.png", x:1, y:0 });
pieces.push({image: "assests/images/horse_l.png", x:6, y:0 });
pieces.push({image: "assests/images/bishop_l.png", x:2, y:0 });
pieces.push({image: "assests/images/bishop_l.png", x:5, y:0 });
pieces.push({image: "assests/images/queen_l.png", x:3, y:0 });
pieces.push({image: "assests/images/king_l.png", x:4, y:0 });


pieces.push({image: "assests/images/rook_b.png", x:0, y:7 });
pieces.push({image: "assests/images/rook_b.png", x:7, y:7 });
pieces.push({image: "assests/images/horse_b.png", x:1, y:7 });
pieces.push({image: "assests/images/horse_b.png", x:6, y:7 });
pieces.push({image: "assests/images/bishop_b.png", x:2, y:7 });
pieces.push({image: "assests/images/bishop_b.png", x:5, y:7 });
pieces.push({image: "assests/images/queen_b.png", x:3, y:7 });
pieces.push({image: "assests/images/king_b.png", x:4, y:7 });



function Chessboard() {
    let board =[];
    let no = 0;

    for(let j=7; j>=0;j--){//vertical
        for(let i=0; i<8;i++){//horizontal
            no = i+j+2;
            let image = undefined;//not null here 

            pieces.forEach(p => {
               if(p.x === i &&p.y === j){
                image = p.image;
               }
            })
            board.push(<Tile no={no} i={i} j={j} image={image}/>);
           
        }
    }
    return (
    <div id='chessboard'>
        {board}
    </div>
  )
}

export default Chessboard
