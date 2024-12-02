import { util } from "./util.js";

let board = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]];


function isValidPlace(grid, row, col, number){
    for (let i = 0; i < 9; i++){
        if (grid[i][col] ===number){
            return false
        }
    }
    for (let i = 0; i < 9; i++){
        if (grid[row][i] ===number){
            return false
        }
        }
    let localboxrow = row - (row % 3)
    let localboxcol = col - (col % 3)
    for(let i = localboxrow; i < localboxrow + 3; i++){
        for(let j = localboxcol; j < localboxcol + 3; j++){
            if (grid[i][j] === number){
                return false
            }
        }
    }
    return true
}

function solve(grid){
    for(let row = 0; row <9; row++ ){
        for (let col = 0; col <9; col ++){
            if (grid[row][col] ===0){
                for(let guess = 1; guess < 10; guess++){
                    if (isValidPlace(grid, row, col, guess)){
                        grid[row][col] = guess;
                        if (solve(grid)){
                            return true
                        }
                        grid[row][col] = 0;
                    }
                }
                return false
            }
        }
    }
    return true
}

function createPuzzle(){
    let puzzle = getrandomsudoku();
    for (let i = 0; i<9; i++){
        puzzle[i] = Array(9).fill(0);

    }
    solve(puzzle);
    for(let i = 0; i<9;i++){
        for(let j = 0; j<9; j++){
            if (Math.random() > 0.3)puzzle[i][j] = 0;

        }
    }
    return puzzle;
}
function getrandomsudoku(){
    let puzzle = [];
    for (let i = 0; i<9; i++){
        puzzle[i] = Array(9).fill(0);

    }
    for (let i; i<8;i++){
        let number = Math.floor(Math.random()*8)+1;
        while (!isValidPlace(puzzle,0,1,number)){
            number = Math.floor(Math.random()*8)+1;
        }
        puzzle[0][1] = number;

    }
    return puzzle;
}
let puzzle = createPuzzle();
// let solution = [];
// util.copyGrid(board, solution);
solve(puzzle);
util.print2darray(puzzle);