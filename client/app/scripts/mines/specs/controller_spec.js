'use strict';

describe('Controller: minesweeper', function () {

  beforeEach(module('Minesweeper'));
  beforeEach(module('underscore'));

  var controller;
  var scope;
  var initialState

  function instantiateController() {
    inject(function ($controller) {
      controller = $controller('minesweeper', { $scope: scope, initialState: initialState });
    });
  }

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    instantiateController();
  }));

  describe('On instance', function () {
    it('should put into scope the initial state', function () {
      initialState = ['*..', '...', '.*.'];
      instantiateController();
      expect(scope.state.length).toBe(3);
      expect(scope.state).toEqual([['Bomb!', 1, 0], [2, 2, 1], [1, 'Bomb!', 1]]);
    });

    it('should initiate an empty array of clicked boxes', function() {
      expect(scope.clickedBoxes).toEqual([[false, false, false], [false, false, false], [false, false, false]]);
    })
  });

  describe('clickCell', function() {
    it('should change the state of the cell', function() {
      scope.clickCell(1,2);
      expect(scope.clickedBoxes[1][2]).toBe(true);
      scope.clickCell(2,1);
      expect(scope.clickedBoxes[2][1]).toBe(true);
    });

    it('should not return a clicked cel to false', function() {
      scope.clickCell(1,2);
      scope.clickCell(1,2);
      expect(scope.clickedBoxes[1][2]).toBe(true);
    });

    it('should set the bombClicked state to true', function() {
      expect(scope.bombClicked).toBe(false);
      scope.clickCell(0,1);
      expect(scope.bombClicked).toBe(false);
      scope.clickCell(0,0);
      expect(scope.bombClicked).toBe(true);
    })
  });

  describe('when going to /minesweeper', function () {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/mines/views/minesweeper.html').respond('<div></div>');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/minesweeper');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/mines/views/minesweeper.html');
      expect(route.current.controller).toBe('minesweeper');
    });
  });

});
