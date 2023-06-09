import "./tile.css";

// const horizontalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
// const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Props{
  image ?: string,
  no: number,
  i: number,
  j : number
}

function Tile({no , i , j , image}: Props) {
  if (no % 2 === 0) {
    return (
      <div className="tile black-tile">
         {/* black-tile-text text-in */}
          {/* {i===0 && <div className="top-box">
             {verticalAxis[j]}
          </div>} */}
          {image && <div className="chess-piece" style={{backgroundImage: `url(${image})`}}></div>}
          {/* <img className="chess-piece-image" src={image} alt="" /> */}
          {/* {j===0 && <div className="bottom-box">
             {horizontalAxis[i]}
          </div>} */}
      </div>
    );
  } else {
    return (
      <div className="tile white-tile ">
        {/* white-tile-text text-in */}
          {/* {i===0 && <div className="top-box">
             {verticalAxis[j]}
          </div>} */}
          {image && <div className="chess-piece" style={{backgroundImage: `url(${image})`}}></div>}
          {/* <img className="chess-piece-image" src={image} alt="" /> */}
          {/* {j===0 && <div className="bottom-box">
             {horizontalAxis[i]}
          </div>} */}
        </div>
    );
  }
}

export default Tile;
