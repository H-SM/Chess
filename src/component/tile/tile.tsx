import "./tile.css";

// const horizontalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
// const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Props{
  image ?: string,
  no: number,
  i: number,
  j : number,
  highlight : boolean,
}

function Tile({no , i , j , image , highlight}: Props) {
  const className: string = ["tile" , no % 2 === 0 && "black-tile", no % 2 !== 0 && "white-tile", highlight && "tile-highlight"].filter(Boolean).join(" ");

  
    return (
      <div className={className}>
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

}

export default Tile;
