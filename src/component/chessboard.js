import React from 'react'
import './chessboard.css';

const horizontalAxis = ["A","B","C","D","E","F","G","H"];
const verticalAxis = ["1","2","3","4","5","6","7","8"];

function Chessboard() {
    let board =[];
    for(let j=7; j>=0;j--){//vertical
        for(let i=0; i<8;i++){//horizontal
            const no = i+j+2;
            if(no%2===0){
            board.push(<div className='tile black-tile'>{horizontalAxis[i]}{verticalAxis[j]} </div>);
            }
            else{
            board.push(<div className='tile white-tile'>{horizontalAxis[i]}{verticalAxis[j]} </div>);
            }
        }
    }
    return (
    <div id='chessboard'>
        {board}
    </div>
  )
}

export default Chessboard
