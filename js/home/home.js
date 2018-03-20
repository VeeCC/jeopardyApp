'use strict';
jeopardyApp.controller("homeController", homeController);
homeController.$inject = ['$state','centralService'];
function homeController($state,centralService) {
    var ctrl = this;
    
    ctrl.atContent = false;
    ctrl.teams = [{name: "Knows Everything"},{name: "Never Win"}];
    
    ctrl.$onInit = function() {
        ctrl.title = centralService.getTitle()||"Jeopardy";
    };
    
    ctrl.setTeamName = function() {
        ctrl.atContent = true;    
    };
    
    ctrl.startGame = function() {
        var teams = ctrl.teams.map(t => ({name: t.name, score: 0}));
        centralService.setTeams(teams);
        $state.go('gameboard');
    }
};