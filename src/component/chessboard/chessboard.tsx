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

for(let p=0; p<2 ; p++){
    const type =(p===0)?"b":"l";
    const y = (p===0)?7:0;

    pieces.push({image: `assests/images/rook_${type}.png`, x:0, y });
    pieces.push({image: `assests/images/rook_${type}.png`, x:7, y });
    pieces.push({image: `assests/images/horse_${type}.png`, x:1, y });
    pieces.push({image: `assests/images/horse_${type}.png`, x:6, y });
    pieces.push({image: `assests/images/bishop_${type}.png`, x:2, y });
    pieces.push({image: `assests/images/bishop_${type}.png`, x:5, y });
    pieces.push({image: `assests/images/queen_${type}.png`, x:3, y });
    pieces.push({image: `assests/images/king_${type}.png`, x:4, y });
}
for(let i=0 ;i<8;i++) {
    pieces.push({image: "assests/images/pawn_b.png", x:i, y:6 });
}

for(let i=0 ;i<8;i++) {
    pieces.push({image: "assests/images/pawn_l.png", x:i, y:1 });
}

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
