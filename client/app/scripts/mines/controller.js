'use strict';

angular.module('Minesweeper')
.controller('minesweeper', function ($scope, initialState) {
  $scope.clickedBoxes = [];
  $scope.bombClicked = false;

  $scope.state = initialState.map(function(row, rowIndex) {
    $scope.clickedBoxes.push(row.split('').map(function() {return false;}));
    return row.split('').map(function(cell) {return cell === '*' ? 'Bomb!' : 0; });
  });

  $scope.state = $scope.state.map(function(row, rowIndex) {
    return row.map(function(col, colIndex) {
      return col === 'Bomb!' ? col : getSurroundingBombs(rowIndex, colIndex);
    });
  });

  $scope.clickCell = function(row, col) {
    $scope.clickedBoxes[row][col] = true;
    $scope.bombClicked = $scope.bombClicked || $scope.state[row][col] === 'Bomb!';
  }

  function getSurroundingBombs(rowIndex, colIndex) {
    return [].concat.apply([], $scope.state
    .slice(Math.max(rowIndex - 1, 0), rowIndex + 2)
    .map(function(row) { return row.slice(Math.max(colIndex - 1, 0), colIndex + 2)}))
    .filter(function(cell) { return cell === 'Bomb!'; }).length;
  }
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/minesweeper', {
    templateUrl: 'scripts/mines/views/minesweeper.html',
    controller: 'minesweeper',
    resolve: {
      initialState: function() { return ['*....*', '......', '.*....', '.****.', '.****.']; }
    }
  });
});
