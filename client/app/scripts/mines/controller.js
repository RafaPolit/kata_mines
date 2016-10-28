'use strict';

angular.module('Minesweeper')
.controller('minesweeper', function ($scope, initialState) {
  initialState = initialState || [];
  $scope.state = [];
  $scope.clickedBoxes = [];
  $scope.bombClicked = false;

  initialState.forEach(function(row) {
    var colData = [];
    for (var col = 0; col < initialState.length; col ++) {
      colData.push(row[col] === '*' ? 'Bomb!' : 0);
    }
    $scope.state.push(colData);
    $scope.clickedBoxes.push(colData.map(function() { return false; }));
  });

  $scope.state = $scope.state.map(function(row, rowIndex) {
    return row.map(function(col, colIndex) {
      if (col === 'Bomb!') { return col; }
      return getSurroundingBombs($scope.state, row, col, rowIndex, colIndex);
    });
  });

  $scope.clickCell = function(row, col) {
    $scope.clickedBoxes[row][col] = true;
    $scope.bombClicked = $scope.state[row][col] === 'Bomb!';
  }
  // ---

  function getSurroundingBombs(initialState, row, col, rowIndex, colIndex) {
    var surroundingBombs = 0;
    if (rowIndex > 0 && colIndex > 0 && initialState[rowIndex - 1][colIndex -1] === 'Bomb!') { surroundingBombs++; }
    if (rowIndex > 0 && initialState[rowIndex - 1][colIndex] === 'Bomb!') { surroundingBombs++; }
    if (rowIndex > 0 && initialState[rowIndex - 1][colIndex + 1] === 'Bomb!') { surroundingBombs++; }
    if (colIndex > 0 && initialState[rowIndex][colIndex - 1] === 'Bomb!') { surroundingBombs++; }
    if (initialState[rowIndex][colIndex + 1] === 'Bomb!') { surroundingBombs++; }
    if (rowIndex < initialState.length - 1 && colIndex > 0 && initialState[rowIndex + 1][colIndex - 1] === 'Bomb!') { surroundingBombs++; }
    if (rowIndex < initialState.length - 1  && initialState[rowIndex + 1][colIndex] === 'Bomb!') { surroundingBombs++; }
    if (rowIndex < initialState.length - 1 && initialState[rowIndex + 1][colIndex + 1] === 'Bomb!') { surroundingBombs++; }
    return (surroundingBombs);
  }
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/minesweeper', {
    templateUrl: 'scripts/mines/views/minesweeper.html',
    controller: 'minesweeper',
    resolve: {
      initialState: function() { return ['*....', '.....', '.*...', '.****']; }
    }
  });
});
