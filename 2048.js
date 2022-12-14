var board;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let box = document.createElement("div");
            box.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateBox(box, num);
            document.getElementById("board").append(box);
        }
    }
    //criando numero 2
    setTwo();
    setTwo();

}

function updateBox(box, num) {
    box.innerText = "";
    box.classList.value = ""; 
    box.classList.add("box");
    if (num > 0) {
        box.innerText = num.toString();
        if (num <= 4096) {
            box.classList.add("x"+num.toString());
        }               
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
  
})

function filterZero(row){
    return row.filter(num => num != 0); //cria nova matriz de todos os num =! 0
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;         
        }
    } 
    row = filterZero(row); 
    //addicona zeros
    while (row.length < columns) {
        row.push(0);
    } 
    return row;f
}

//deslizar para a esquerda
function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let box = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
        }
    }
}

//deslizar para a direita
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         
        row.reverse();             
        row = slide(row)            
        board[r] = row.reverse();   
        for (let c = 0; c < columns; c++){
            let box = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
        }
    }
}

//deslizar para cima
function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let box = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
        }
    }
}

//deslizar para baixo
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let box = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
        }
    }
}

//jogada
function setTwo() {
    if (!hasEmptyBox()) {
        return;
    }
    let found = false;
    while (!found) {
        //encontrar linha e coluna aleatoria para colocar um 2
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let box = document.getElementById(r.toString() + "-" + c.toString());
            box.innerText = "2";
            box.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyBox() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //pelo menos um zero no tabuleiro
                return true;
            }
        }
    }
    return false;
}