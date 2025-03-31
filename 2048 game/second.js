

const rotateBoard = (board) =>{

    let n = board.length;
    const newBoard = [];

    for(let i = 0;i < n;i++){
        newBoard.push([]);
        for(let j = 0;j < n;j++){
            newBoard[i][j] = board[n - j-1][i];
        }
    }

    return newBoard

}

const moveLeft = (row) =>{
    const n = row.length;
    const fillterRow = row.filter((num) => num !== 0);
    
    for(let i = 0;i < fillterRow.length;i++){
        if(fillterRow[i] == fillterRow[i+1]){
            fillterRow[i] *= 2;
            fillterRow[i+1] = 0;
        }
    }

    const newRow = fillterRow.filter((num) => num != 0);

    while(newRow.length < n)newRow.push(0);

    return newRow;


}

// const rotate = rotateBoard(newBoard);
// // console.log(rotate)

// newBoard = newBoard.map(moveLeft)
// console.log(newBoard)
// newBoard = newBoard.map(moveLeft)
// console.log(newBoard)
// newBoard = rotateBoard(newBoard)
// console.log(newBoard)

const addnewTile = (board) => {
    let n = board.length;
    let emptyCell = [];

    for(let i = 0;i < n;i++){
        for(let j = 0;j < n;j++){
            if(board[i][j] === 0)emptyCell.push({i, j})
        }
    }
    if(emptyCell.length === 0)return board
    const randomCell = emptyCell[Math.floor(Math.random()*emptyCell.length)];
    board[randomCell.i][randomCell.j] = Math.random() < 0.9 ? 2 : 4;

    return board
}
// newBoard = addnewTile(newBoard);

// for(let i = 0;i < 2;i++){
//     newBoard = rotateBoard(newBoard)
// }

// console.log(newBoard)

// for(let i = 0;i < 2;i++){
//     newBoard = rotateBoard(newBoard)
// }





