import { Position } from "../../modals";
import { Piece } from "../../modals/Piece";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

  export const getPossibleKingMoves = (king: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 1; i < 2; i++) {
      
      const destination = new Position(king.position.x, king.position.y + i);
      if(destination.x< 0 || destination.x > 7 || destination.y< 0 || destination.y > 7){
        break;
      }
      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom movement
    for(let i = 1; i < 2; i++) {
      const destination = new Position(king.position.x, king.position.y - i);
      if(destination.x< 0 || destination.x > 7 || destination.y< 0 || destination.y > 7){
        break;
      }
      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Left movement
    for(let i = 1; i < 2; i++) {
      const destination = new Position(king.position.x - i, king.position.y);
      if(destination.x< 0 || destination.x > 7 || destination.y< 0 || destination.y > 7){
        break;
      }
      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Right movement
    for(let i = 1; i < 2; i++) {
      const destination = new Position(king.position.x + i, king.position.y);
      if(destination.x< 0 || destination.x > 7 || destination.y< 0 || destination.y > 7){
        break;
      }
      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Upper right movement
    for(let i = 1; i < 2; i++) {
      const destination = new Position(king.position.x + i, king.position.y + i);
      if(destination.x< 0 || destination.x > 7 || destination.y< 0 || destination.y > 7){
        break;
      }
      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom right movement
    for(let i = 1; i < 2; i++) {
      const destination = new Position(king.position.x + i, king.position.y - i);
      if(destination.x< 0 || destination.x > 7 || destination.y< 0 || destination.y > 7){
        break;
      }
      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom left movement
    for(let i = 1; i < 2; i++) {
      const destination = new Position(king.position.x - i, king.position.y - i);
      if(destination.x< 0 || destination.x > 7 || destination.y< 0 || destination.y > 7){
        break;
      }
      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Top left movement
    for(let i = 1; i < 2; i++) {
      const destination = new Position(king.position.x - i, king.position.y + i);
      if(destination.x< 0 || destination.x > 7 || destination.y< 0 || destination.y > 7){
        break;
      }
      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    return possibleMoves;
  }
  export const getCastlingMoves = (king: Piece, boardstate: Piece[]): Position[] =>{
    const possibleMoves: Position[] = [];
    
    if(king.hasMoved)return possibleMoves;

    //king team rooks which haven't moved 
    const rooks = boardstate.filter(p=> p.isRook && p.team === king.team && !p.hasMoved); 
    for(const rook of rooks){
      //which side do we want top go with the checker
      const direction = (rook.position.x - king.position.x > 0)? 1: -1;

      const destinationRook = king.position.clone();
      destinationRook.x += direction;

      if(!rook.possibleMoves?.some(m => m.samePosition(destinationRook)))continue;

      //are these final destination of castling pieces being targeted by thte enemy?? 
      const concerningTiles = rook.possibleMoves.filter(m => m.y === king.position.y);
      const enemyPiece = boardstate.filter(p => p.team !== king.team);
      let valid = true;
      // if(enemyPiece.some(p => p.possibleMoves?.some(m => concerningTiles.some(t => t.samePosition(m))))){
      //   continue;
      // }

      for(const enemy of enemyPiece){
        if(enemy.possibleMoves === undefined) continue;
        for(const move of enemy.possibleMoves){
          if(concerningTiles.some(t => t.samePosition(move))){
            valid = false;
          }
          if(!valid)break;
        }
        if(!valid)break;
      }
      if(!valid)continue;
      //we now want to add it as a possibleMove then 
      possibleMoves.push(rook.position.clone());
      } 
    return possibleMoves;
  }


  //   let multiplierX = (initialPosition.x > finalPosition.x)? -1: (initialPosition.x === finalPosition.x)? 0 : 1;
//   let multiplierY = (initialPosition.y > finalPosition.y)? -1: (initialPosition.y === finalPosition.y)? 0 : 1;
//   let passedPosition= new Position ( initialPosition.x + multiplierX, initialPosition.y + multiplierY);
//   if(passedPosition.samePosition( finalPosition)){
//       if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
//           return true;
//       }
//   }
//   return false;