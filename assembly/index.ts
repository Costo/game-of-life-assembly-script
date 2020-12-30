
const gliderGun: bool[][] = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

const spaceship: bool[][] = [
  [0,1,0,0,1],
  [1,0,0,0,0],
  [1,0,0,0,1],
  [1,1,1,1,0],
];

let generation = 0;
let board: bool[][] = [];
let rows: u32 = 0;
let cols: u32 = 0;

function addPattern(pattern: bool[][], row: u32, col: u32): void {
  for (let i = 0; i < pattern.length; i++)
  for (let j = 0; j < pattern[0].length; j++) {
    board[row + i][col + j] = pattern[i][j];
  }
}

export function init(r: u32, c: u32): void {
  generation = 0;
  board = [];
  cols = c;
  rows = r;
  for (let i:u32 = 0; i < rows; i++){
    let row: bool[] = [];
    board.push(row);
    for (let j:u32 = 0; j < cols; j++) {
      row.push(0);
    }
  }

  addPattern(spaceship, 30, 30);
  addPattern(spaceship, 40, 30);
  addPattern(spaceship, 50, 30);
  addPattern(spaceship, 60, 30);
  addPattern(spaceship, 70, 30);
  addPattern(gliderGun, 10, 50);
}

export function iterate(): bool[] {
  let newBoard: bool[][] = [];
  for (let i:u32 = 0; i < rows; i++) {
    let newRow: bool[] = [];
    newBoard.push(newRow);
    for (let j:u32 = 0; j < cols; j++) {
      let neighbors = 0;
      for (let k = -1; k < 2; k++){
          for (let l = -1; l < 2; l++)  {
          let row = k + i;
          let col = l + j;
          if ((k == 0) && (l == 0)) {
            continue;
          }
          if (row < 0) {
            row = rows - 1;
          } else if (row == rows) {
            row = 0;
          }
          if (col < 0) {
            col = cols - 1;
          } else if (col == cols) {
            col = 0;
          }
          let value = board[row][col];
          neighbors += +value;
        }
      }
      if (neighbors == 3) {
        newRow.push(1);
      } else if (neighbors == 2) {
        newRow.push(board[i][j]);
      } else {
        newRow.push(0);
      }
    }
  }
  board = newBoard;
  generation++;
  return board.flat()
}