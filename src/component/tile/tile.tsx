import "./tile.css";

const horizontalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

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
        <div className="black-tile-text text-in">
          <div className="top-box">
            {i === 0 ? verticalAxis[j] : ""}
          </div>
          <img className="chess-piece-image" src={image} alt="" />
          <div className="bottom-box">
            {j === 0 ? horizontalAxis[i] : ""}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="tile white-tile white-tile-text">
        <div className="white-tile-text text-in">
          <div className="top-box">
            {i === 0 ? verticalAxis[j] : ""}{" "}
          </div>
          <img className="chess-piece-image" src={image} alt="" />
          <div className="bottom-box">
            {j === 0 ? horizontalAxis[i] : ""}
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default Tile;
