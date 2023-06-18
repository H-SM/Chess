export const VERTICAL_AXIS = ["1","2","3","4","5","6","7","8"];
export const HORIZONTAL_AXIS = ["A","B","C","D","E","F","G","H"];

export interface Position {
    x : number, 
    y : number,
}

export function samePosition(p1 : Position, p2 : Position) {
    return p1.x === p2.x && p1.y === p2.y;
}
export const GRID_SIZE = 100; 

export interface Piece {
    image: string,
    position : Position,
    type : PieceType,
    team : TeamType,
    enpassant ?: boolean,
    possibleMoves?: Position[],
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

export const initialBoardState: Piece[] = [
    { image: `assests/images/rook_b.png`, position : { x: 0, y : 7 }, type : PieceType.ROOK, team : TeamType.BLACK},
    { image: `assests/images/rook_b.png`, position : {x: 7, y : 7}, type : PieceType.ROOK, team : TeamType.BLACK},
    { image: `assests/images/horse_b.png`, position : {x: 1, y : 7}, type : PieceType.HORSE, team : TeamType.BLACK},
    { image: `assests/images/horse_b.png`, position : {x: 6, y : 7}, type : PieceType.HORSE, team : TeamType.BLACK},
    { image: `assests/images/bishop_b.png`,position : { x: 2, y : 7}, type : PieceType.BISHOP, team : TeamType.BLACK},
    { image: `assests/images/bishop_b.png`,position : { x: 5, y : 7}, type : PieceType.BISHOP, team : TeamType.BLACK},
    { image: `assests/images/queen_b.png`, position : {x: 3, y : 7}, type : PieceType.QUEEN, team : TeamType.BLACK},
    { image: `assests/images/king_b.png`,position : { x: 4, y : 7}, type : PieceType.KING, team : TeamType.BLACK},

    { image: `assests/images/rook_l.png`,position : { x: 0, y : 0}, type : PieceType.ROOK, team : TeamType.WHITE},
    { image: `assests/images/rook_l.png`,position : { x: 7, y : 0}, type : PieceType.ROOK, team : TeamType.WHITE},
    { image: `assests/images/horse_l.png`,position : { x: 1, y : 0}, type : PieceType.HORSE, team : TeamType.WHITE},
    { image: `assests/images/horse_l.png`,position : { x: 6, y : 0}, type : PieceType.HORSE, team : TeamType.WHITE},
    { image: `assests/images/bishop_l.png`,position : { x: 2, y : 0}, type : PieceType.BISHOP, team : TeamType.WHITE},
    { image: `assests/images/bishop_l.png`,position : { x: 5, y : 0}, type : PieceType.BISHOP, team : TeamType.WHITE},
    { image: `assests/images/queen_l.png`,position : { x: 3, y : 0}, type : PieceType.QUEEN, team : TeamType.WHITE},
    { image: `assests/images/king_l.png`,position : { x: 4, y : 0}, type : PieceType.KING, team : TeamType.WHITE},

    { image: "assests/images/pawn_b.png",position : { x: 0, y: 6 }, type : PieceType.PAWN, team : TeamType.BLACK},
    { image: "assests/images/pawn_b.png",position : { x: 1, y: 6 }, type : PieceType.PAWN, team : TeamType.BLACK},
    { image: "assests/images/pawn_b.png",position : { x: 2, y: 6 }, type : PieceType.PAWN, team : TeamType.BLACK},
    { image: "assests/images/pawn_b.png",position : { x: 3, y: 6 }, type : PieceType.PAWN, team : TeamType.BLACK},
    { image: "assests/images/pawn_b.png",position : { x: 4, y: 6 }, type : PieceType.PAWN, team : TeamType.BLACK},
    { image: "assests/images/pawn_b.png",position : { x: 5, y: 6 }, type : PieceType.PAWN, team : TeamType.BLACK},
    { image: "assests/images/pawn_b.png",position : { x: 6, y: 6 }, type : PieceType.PAWN, team : TeamType.BLACK},
    { image: "assests/images/pawn_b.png",position : { x: 7, y: 6 }, type : PieceType.PAWN, team : TeamType.BLACK},

    { image: "assests/images/pawn_l.png",position : { x: 0, y: 1 }, type : PieceType.PAWN, team : TeamType.WHITE},
    { image: "assests/images/pawn_l.png",position : { x: 1, y: 1 }, type : PieceType.PAWN, team : TeamType.WHITE},
    { image: "assests/images/pawn_l.png",position : { x: 2, y: 1 }, type : PieceType.PAWN, team : TeamType.WHITE},
    { image: "assests/images/pawn_l.png",position : { x: 3, y: 1 }, type : PieceType.PAWN, team : TeamType.WHITE},
    { image: "assests/images/pawn_l.png",position : { x: 4, y: 1 }, type : PieceType.PAWN, team : TeamType.WHITE},
    { image: "assests/images/pawn_l.png",position : { x: 5, y: 1 }, type : PieceType.PAWN, team : TeamType.WHITE},
    { image: "assests/images/pawn_l.png",position : { x: 6, y: 1 }, type : PieceType.PAWN, team : TeamType.WHITE},
    { image: "assests/images/pawn_l.png",position : { x: 7, y: 1 }, type : PieceType.PAWN, team : TeamType.WHITE},
    
];
