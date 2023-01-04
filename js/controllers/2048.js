angular.module('ngGame', []).controller('ngGameController', function($scope) {

var board;
var rows = 4;
var columns = 4;

$scope.setGame = function () {

    $scope.board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

     //criando numero 2
     $scope.setTwo();
     $scope.setTwo();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++){
            let box = $scope.board;
            box.id = r.toString() + "-" + c.toString();
            let num = $scope.board[r][c];
            $scope.updateBox(box, num)
        } 
    }
   

}

$scope.updateBox = function(box, num) {
    box.innerText = "";
    if (num > 0) {
        box.innerText = num.toString();               
    }
}

$scope.keyPress = function(keyEvent) {
    switch(keyEvent.which){
      case 37:
        $scope.slideLeft();
        $scope.setTwo();
      break;
      case 39:
        $scope.slideRight();
        $scope.setTwo();
      break;
      case 38:
        $scope.slideUp();
        $scope.setTwo();
      break;
      case 40:
        $scope.slideDown();
        $scope.setTwo();
      break;
    }
  }

$scope.filterZero = function(row){
    return row.filter(num => num != 0); //cria nova matriz de todos os num != 0
}

$scope.slide = function(row) {
    row = $scope.filterZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;         
        }
    } 
    row = $scope.filterZero(row); 
    //addicona zeros
    while (row.length < columns) {
        row.push(0);
    } 
    return row;
}

//deslizar para a esquerda jogada
$scope.slideLeft = function() {
    for (let r = 0; r < rows; r++) {
        let row = $scope.board[r];
        row = $scope.slide(row);
        $scope.board[r] = row;
        for (let c = 0; c < columns; c++){
            let num = $scope.board[r][c];
            $scope.updateBox($scope.board, num);
        }
    }
}

//deslizar para a direita jogada
$scope.slideRight  = function() {
    for (let r = 0; r < rows; r++) {
        let row = $scope.board[r];         
        row.reverse();             
        row = $scope.slide(row);            
        $scope.board[r] = row.reverse();   
        for (let c = 0; c < columns; c++){
            let num = $scope.board[r][c];
            $scope.updateBox(box, num);
        }
    }
}

//deslizar para cima jogada
$scope.slideUp = function() {
    for (let c = 0; c < columns; c++) {
        let row = [$scope.board[0][c], $scope.board[1][c], $scope.board[2][c], $scope.board[3][c]];
        row = $scope.slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let num = board[r][c];
            $scope.updateBox(box, num);
        }
    }
}

//deslizar para baixo jogada
$scope.slideDown = function() {
    for (let c = 0; c < columns; c++) {
        let row = [$scope.board[0][c], $scope.board[1][c], $scope.board[2][c], $scope.board[3][c]];
        row.reverse();
        row = $scope.slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            $scope.board[r][c] = row[r];
            let num = $scope.board[r][c];
            $scope.updateBox(box, num);
        }
    }
}

//jogada para setar o numero 2 
$scope.setTwo = function() {
    if (!$scope.hasEmptyBox()) {
        return;
    }
    let found = false;
    while (!found) {
        //encontrar linha e coluna aleatoria para colocar um 2
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if ($scope.board[r][c] == 0) {
            $scope.board[r][c] = 2;
            found = true;
        }
    }
}

$scope.hasEmptyBox = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if ($scope.board[r][c] == 0) { //pelo menos um zero no tabuleiro
                return true;
            }
        }
    }
    return false;
}
});